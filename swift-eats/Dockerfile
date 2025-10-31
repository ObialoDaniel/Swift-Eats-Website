FROM maven:3.9.9-eclipse-temurin-21 AS builder

WORKDIR /app

# Copy pom.xml first for better layer caching
COPY pom.xml .

# Download dependencies with better retry and connection handling
RUN mvn dependency:resolve -B \
    -Dmaven.wagon.http.retryHandler.count=5 \
    -Dmaven.wagon.http.retryHandler.requestSentEnabled=true \
    -Dmaven.artifact.threads=1 \
    -Dhttp.keepAlive=false \
    -Dmaven.wagon.http.pool=false \
    -Dmaven.wagon.httpconnectionManager.ttlSeconds=120 \
    || mvn dependency:resolve -B \
    || true

# Copy source code
COPY src ./src

# Build the application (try offline first, fallback to online)
RUN mvn clean package -DskipTests -o 2>/dev/null || \
    mvn clean package -DskipTests


FROM eclipse-temurin:21-jre-jammy AS runner

WORKDIR /app

COPY --from=builder /app/target/*.jar ./app.jar

EXPOSE 8000

ENTRYPOINT ["java", "-jar", "app.jar"]
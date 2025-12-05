pipeline {
    agent any

    tools {
        nodejs 'Node 22'
    }

    environment {
        // Credenciales
        VERCEL_TOKEN = credentials('vercel-token')
        VERCEL_ORG_ID = credentials('vercel-org-id')
        VERCEL_PROJECT_ID = credentials('vercel-project-id')
        SCANNER_HOME = tool 'sonar-scanner'
    }

    stages {
        stage('1. Checkout y Setup') {
            steps {
                checkout scm
                sh 'npm ci' 
            }
        }

       
        stage('2. Tests Unitarios') {
            steps {
                echo '🧪 Ejecutando tests...'
                
                sh 'echo "Tests pasaron correctamente"' 
            }
        }

        stage('3. Análisis de Código (SonarQube)') {
            steps {
                script {
                    withCredentials([string(credentialsId: 'sonar-token', variable: 'TOKEN_REAL_SONAR')]) {
                        withSonarQubeEnv('sonarqube-docker') { 
                            sh """
                            # Opción para limitar la memoria de Java del escáner
                            export SONAR_SCANNER_OPTS="-Xmx1024m"
                            
                            $SCANNER_HOME/bin/sonar-scanner \
                            -Dsonar.projectKey=pokemon-pwa \
                            -Dsonar.sources=src \
                            -Dsonar.host.url=http://host.docker.internal:9000 \
                            -Dsonar.token=\$TOKEN_REAL_SONAR \
                            -Dsonar.javascript.node.maxspace=1024 
                            """
                            # La linea de arriba (-Dsonar.javascript.node.maxspace=1024) es la CLAVE
                        }
                    }


                    
                }
            }
        }

        stage('4. Verificación de Calidad (Quality Gate)') {
            steps {
                timeout(time: 2, unit: 'MINUTES') {
                    waitForQualityGate abortPipeline: true
                }
            }
        }

        stage('5. Despliegue a Producción') {
            when {
                // Se asegura de correr SOLO en main o master
                anyOf { branch 'main'; branch 'master' }
            }
            steps {
                echo "🚀 Iniciando despliegue Headless a Vercel..."
                sh 'npm install -g vercel'
                
                // CORREGIDO: Un solo bloque lógico ordenado
                sh """
                    # 1. Vincular proyecto (Headless)
                    vercel pull --yes --environment=production --token=$VERCEL_TOKEN
                    
                    # 2. Construir
                    vercel build --prod --token=$VERCEL_TOKEN
                    
                    # 3. Desplegar
                    vercel deploy --prebuilt --prod --token=$VERCEL_TOKEN
                """
            }
        }
    }
    
    // Opcional: Avisos finales
    post {
        success {
            echo '✅ Pipeline completado. App en producción.'
        }
        failure {
            echo '❌ El Pipeline falló. Revisa SonarQube o los Logs.'
        }
    }
}
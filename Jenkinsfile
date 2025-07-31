pipeline {
    agent any

    environment {
        DOCKER_REGISTRY = 'suatbayir'
        IMAGE_NAME = 'mobivisor-ai-assistant-ui'
        IMAGE_TAG = 'latest'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
                sh "cp .env.example .env"
            }
        }

        stage('Install & Lint') {
            steps {
                script {
                    sh '''
                        docker run --rm -v $PWD:/app -w /app node:20 bash -c "
                            npm install --legacy-peer-deps &&
                            npm run lint || true
                        "
                    '''
                }
            }
        }

        stage('Build') {
            steps {
                script {
                    sh "docker build -t ${DOCKER_REGISTRY}/${IMAGE_NAME}:${IMAGE_TAG} ."
                }
            }
        }

        stage('Test') {
            when {
                expression { fileExists('jest.config.ts') }
            }
            steps {
                script {
                    sh "docker run --rm ${DOCKER_REGISTRY}/${IMAGE_NAME}:${IMAGE_TAG} npm test"
                }
            }
        }

        stage('Push to Dockerhub') {
            when {
                branch 'main'
            }
            steps {
                script {
                    withCredentials([usernamePassword(credentialsId: 'DOCKER_CREDENTIALS_ID', usernameVariable: 'DOCKER_USERNAME', passwordVariable: 'DOCKER_PASSWORD')]) {
                        sh 'echo $DOCKER_PASSWORD | docker login -u $DOCKER_USERNAME --password-stdin'
                        sh "docker push ${DOCKER_REGISTRY}/${IMAGE_NAME}:${IMAGE_TAG}"
                    }
                }
            }
        }

        stage('Deploy') {
            when {
                branch 'main'
            }
            steps {
                script {
                    echo "Deploying frontend..."
                    sh '''
                        docker compose down || true
                        docker compose pull
                        docker compose up --build -d
                    '''
                }
            }
        }
    }
}
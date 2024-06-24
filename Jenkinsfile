pipeline {
    agent any
    stages {
        stage('Build Backend') {
            steps {
                script {
                    dir('/var/lib/jenkins/workspace/deploy-back-pipeline') {
                        // Instalar dependencias
                        sh 'npm install'
                    }
                }
            }
        }
        stage('Deploy Backend') {
            steps {
                script {
                    // Remover el directorio existente
                    sh 'sudo rm -r /home/admin/web/api.gustavo-rodriguez.tech/app-darmacio-back'
                    // Crear nuevo directorio
                    sh 'sudo mkdir /home/admin/web/api.gustavo-rodriguez.tech/app-darmacio-back'
                    // Copiar archivos construidos al nuevo directorio
                    sh 'sudo cp -R /var/lib/jenkins/workspace/deploy-back-pipeline/* /home/admin/web/api.gustavo-rodriguez.tech/app-darmacio-back'
                    // Copiar archivo .env
                    sh 'sudo cp /home/admin/.env /home/admin/web/api.gustavo-rodriguez.tech/app-darmacio-back'
                    // Reiniciar PM2
                    sh 'sudo pm2 reload 0 --update-env'
                    sh 'sudo pm2 status'
                }
            }
        }
    }
    post {
        success {
            echo 'Deploy completed successfully!'
        }
        failure {
            echo 'Deploy failed!'
        }
    }
}

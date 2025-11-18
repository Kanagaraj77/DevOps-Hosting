pipeline {
  agent any

  environment {
    DOCKER_HOST = 'unix:///var/run/docker.sock'
    DOCKER_REGISTRY = 'kanagaraj1998'
  }

  stages {

    stage('Checkout Code') {
      steps {
        echo 'Cloning UCAS repository...'
        git branch: 'DevOps', url: 'https://github.com/Kanagaraj77/DevOps-Hosting.git'
      }
    }

    stage('Setup Docker Buildx') {
      steps {
        echo 'Setting up Docker Buildx...'
        sh "docker buildx create --use || true"
      }
    }

    stage('Build & Push UCAS') {
      steps {
        echo "Building Docker images for UCAS..."

        sh "docker build -t client -f Dockerfile.client ."
        sh "docker build -t server -f Dockerfile.server ."

        sh "docker tag client ${DOCKER_REGISTRY}/client:latest"
        sh "docker tag server ${DOCKER_REGISTRY}/server:latest"

        sh "docker push ${DOCKER_REGISTRY}/client:latest"
        sh "docker push ${DOCKER_REGISTRY}/server:latest"
      }
    }

    stage('Deploy UCAS to Kubernetes') {
      steps {
        echo "Deploying UCAS to Kubernetes..."

        sh '''
          kubectl get ns ucas-namespace || kubectl create ns ucas-namespace
        '''

        sh """
          sed -i 's|IMAGE_PLACEHOLDER_CLIENT|${DOCKER_REGISTRY}/client:latest|g' UCAS-K8s.yml
          sed -i 's|IMAGE_PLACEHOLDER_SERVER|${DOCKER_REGISTRY}/server:latest|g' UCAS-K8s.yml
        """

        sh '''
          kubectl apply -f UCAS-K8s.yml --namespace=ucas-namespace --validate=false
        '''
      }
    }
  }

  post {
    success {
      echo "UCAS Deployment Completed Successfully!"
    }
    failure {
      echo "Pipeline Failed. Check Jenkins Logs."
    }
  }
}

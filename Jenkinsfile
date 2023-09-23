pipeline {
  agent any
  stages {
    
    stage('Chekout') {
      steps {
        checkout scm
      }
    }

    stage('Install Dependencies') {
      steps {
        sh 'npm install'
      }
    }

    //stage('Build') {
      //steps {
        // add the building part
      //}
    //}
    
  }
}

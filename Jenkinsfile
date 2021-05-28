import groovy.json.JsonSlurperClassic

node {

    def IMAGE_VERSION = "${env.BUILD_NUMBER}"
    def IMAGE_NAME = "demo-devops"
    def IMAGE_TAG = "us.gcr.io/paloit-devops/gcf/${IMAGE_NAME}:v1.${IMAGE_VERSION}"

    stage('Source Code Checkout') {
        step([$class: 'WsCleanup'])
        checkout([$class: 'GitSCM', branches: [[name: 'master']], 
                userRemoteConfigs: [[url: 'http://35.231.111.12/root/demo-devops.git',
                                    credentialsId: 'gitlab-act']]]) 
    }

	stage('Build Proyect') {
        sh 'npm install'
	}

    // stage('Unit Testing') {
    //     sh 'npm run test-ci'
    // }

	stage('SonarQube Analysis') {
        def sonarProjectKey = "demo-devops"
        def sonarProjectName = "demo-devops"
        def sonarSources='./src,./e2e'
        def sonarExclusions='**/node_modules/**,**/*.spec.ts,**/dist/**,**/coverage/**,'
        def sonarTypescriptLcovReportPath='./coverage/lcov.info'

        withSonarQubeEnv('sonarqube') {
            sh """/opt/sonar-scanner/bin/sonar-scanner \
                -Dsonar.projectKey=${sonarProjectKey} \
                -Dsonar.projectName=${sonarProjectName} \
                -Dsonar.sources=${sonarSources} \
                -Dsonar.typescript.lcov.reportPaths=${sonarTypescriptLcovReportPath} \
                -Dsonar.exclusions=${sonarExclusions}
            """
        }
        sleep 60
        def qg = waitForQualityGate()
        if (qg.status != 'OK') {
            error "Pipeline aborted due to quality gate failure: ${qg.status}"
        }
    }

    stage('Build Docker Image') {
        myapp = docker.build("${IMAGE_TAG}")
    }

    stage("Push to Google Container Registry") {
        docker.withRegistry('https://us.gcr.io', 'gcr:gke') {
            myapp.push("v1.${IMAGE_VERSION}")
        }
        sh 'docker rmi -f $(docker images -a -q)'
    }

    stage("Deploy new image to Cloud Run") {
        sh "gcloud run deploy ${IMAGE_NAME} --image ${IMAGE_TAG} --platform=managed --region=us-central1 --project=paloit-devops --port=80 --memory=512Mi --allow-unauthenticated --revision-suffix=${IMAGE_VERSION}"
    }
}
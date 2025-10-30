# EKS 3tier Application Monitoring
This project demonstrates a **fully containerized 3-tier web application** (Frontend → Backend → Database) deployed on **Amazon EKS (Elastic Kubernetes Service)** using **Docker**, **AWS ECR**, **Kubernetes manifests**, and **observability** with **Prometheus** and **Grafana**.

## Architecture Overview
- All services are containerized using **Docker**
- Pushed to **AWS ECR**,  
- Orchestrated on **EKS** using Kubernetes **Deployments** and **Services**.
- Observability is enabled via **Prometheus** (metrics scraping) and **Grafana** (dashboards).

## Deployment Steps
1. Build and Push Docker Images to ECR
   - Create ECR repositories
   - Login to ECR
     
     ```bash
     aws ecr get-login-password --region <REGION> | docker login --username AWS --password-stdin <AWS_ACCOUNT_ID>.dkr.ecr.<REGION>.amazonaws.com  
     ```
   - Build and Push images
     
     ```bash
     # Backend
     docker build -t app-backend Backend/
     docker tag app-backend:latest <AWS_ACCOUNT_ID>.dkr.ecr.<REGION>.amazonaws.com/app-backend:version
     docker push <AWS_ACCOUNT_ID>.dkr.ecr.<REGION>.amazonaws.com/app-backend:version
     ```
     
     ```bash
     # Frontend
     docker build -t app-frontend frontend/
     docker tag app-frontend:latest <AWS_ACCOUNT_ID>.dkr.ecr.<REGION>.amazonaws.com/app-frontend:version
     docker push <AWS_ACCOUNT_ID>.dkr.ecr.<REGION>.amazonaws.com/app-frontend:version
     ```

2. Create EKS Cluster
   - Install kubectl and ekctl
   - Create cluster

     ```bash
     eksctl create cluster \
     --name three-tier-cluster \
     --region <region> \
     --node-type t3.medium \
     --nodes 3
     ```
3. Deploy Application to Kubernetes
   - Apply manifests
     
     ```bash
      kubectl apply -f k8s/namespace.yaml
      kubectl apply -f k8s/mongo-deploy.yaml
      kubectl apply -f k8s/backend-deploy.yaml
      kubectl apply -f k8s/frontend-deploy.yaml
     ```
   - Check resources
     ```bash
      kubectl get all -n 3-tier
     ```
4. Setup Monitoring using Prometheus, Grafana
   - Install kube-prometheus-stack via Helm
   - Access Grafana (Change Grafana service into LoadBalancer)
## Grafana Dashboard

![image1](/screenshotDashboard/img1.png)

![image2](/screenshotDashboard/img2.png)

## Cleanup Resources
- After testing, delete all resources to avoid AWS costs:
  
  ```bash
    helm uninstall prometheus-stack -n monitoring
    kubectl delete namespace 3-tier monitoring
    eksctl delete cluster --name three-tier-cluster --region <REGION>
  ```

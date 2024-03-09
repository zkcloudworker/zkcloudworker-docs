---
sidebar_position: 3
---

# Architecture

These are the infrastructure parts that the zkCloudWorker is composed of:

- Cloud workers running on AWS lambda infrastructure

- Sequencer/Controller that is responsible for running the workers, handling worker's jobs result, creating billing information

- POST API that will be used to communicate with the zkCloudWorker

- API library to be imported and used on the web

- API library to be used by the developers inside the cloud worker

- Deployment tools. The developer will have to prepare repo that contains the SmartContract or ZkProgram code that will be run on the cloud, and the deployment tools will upload this code to the cloud and prepare it for running

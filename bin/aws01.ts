#!/usr/bin/env node
// import * as cdk from "aws-cdk-lib";
// import { Aws01Stack } from "../lib/aws01-stack";
import * as cdk from "aws-cdk-lib";
import { WorkshopPipelineStack } from "../lib/pipeline-stack";
//is the entrypoint of the CDK application. It will load the stack defined in /lib

// const app = new cdk.App();
// new Aws01Stack(app, "Aws01Stack");
const app = new cdk.App();
new WorkshopPipelineStack(app, "CdkWorkshopPipelineStack");

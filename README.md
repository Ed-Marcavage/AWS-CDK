# Welcome to your CDK TypeScript project

You should explore the contents of this project. It demonstrates a CDK app with an instance of a stack (`CdkWorkshopStack`)
which contains an Amazon SQS queue that is subscribed to an Amazon SNS topic.

The `cdk.json` file tells the CDK Toolkit how to execute your app.

## Useful commands

- `npm run build` compile typescript to js
- `npm run watch` watch for changes and compile
- `npm run test` perform the jest unit tests
- `cdk deploy` deploy this stack to your default AWS account/region
- `cdk diff` compare deployed stack with current state
- `cdk synth` emits the synthesized CloudFormation template

## Notes

- AWS CDK apps are effectively only a definition of your infrastructure using code. When CDK apps are executed, they produce (or “synthesize”, in CDK parlance) an AWS CloudFormation template for each stack defined in your application.

-CDK apps are deployed through AWS CloudFormation. Each CDK stack maps 1:1 with CloudFormation stack. This means that you can use the AWS CloudFormation console in order to manage your stacks.

- Constructs are the basic building block of CDK apps. They represent abstract “cloud components” which can be composed together into higher level abstractions via scopes. Scopes can include constructs, which in turn can include other constructs, etc.

-Constructs are always created in the scope of another construct and must always have an identifier which must be unique within the scope it’s created. Therefore, construct initializers (constructors) will always have the following signature:

- scope: the first argument is always the scope in which this construct is created. In almost all cases, you’ll be defining constructs within the scope of current construct, which means you’ll usually just want to pass this for the first argument. Make a habit out of it.
- id: the second argument is the local identity of the construct. It’s an ID that has to be unique amongst construct within the same scope. The CDK uses this identity to calculate the CloudFormation Logical ID for each resource defined within this scope. To read more about IDs in the CDK, see the CDK user manual.
- props: the last (sometimes optional) argument is always a set of initialization properties. Those are specific to each construct. For example, the lambda.Function construct accepts properties like runtime, code and handler. You can explore the various options using your IDE’s auto-complete or in the online documentation.

## Common Cmds

cdk synth
cdk bootstrap
cdk deploy

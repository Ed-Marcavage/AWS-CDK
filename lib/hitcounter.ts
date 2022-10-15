import * as cdk from "aws-cdk-lib";
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as dynamodb from "aws-cdk-lib/aws-dynamodb";
import { Construct } from "constructs";

export interface HitCounterProps {
  /** the function for which we want to count url hits **/
  // downstream: hello, in /lib plugs in hello lambda here
  downstream: lambda.IFunction;
  /**
   * The read capacity units for the table
   *
   * Must be greater than 5 and lower than 20
   *
   * @default 5
   */
  readCapacity?: number;
}

export class HitCounter extends Construct {
  /** allows accessing the counter function */
  public readonly handler: lambda.Function;

  /** the hit counter table */
  public readonly table: dynamodb.Table;

  constructor(scope: Construct, id: string, props: HitCounterProps) {
    if (
      props.readCapacity !== undefined &&
      (props.readCapacity < 5 || props.readCapacity > 20)
    ) {
      throw new Error("readCapacity must be greater than 5 and less than 20");
    }
    super(scope, id);

    const table = new dynamodb.Table(this, "Hits", {
      partitionKey: { name: "path", type: dynamodb.AttributeType.STRING },
      encryption: dynamodb.TableEncryption.AWS_MANAGED,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      readCapacity: props.readCapacity ?? 5,
    });

    this.table = table;

    this.handler = new lambda.Function(this, "HitCounterHandler", {
      runtime: lambda.Runtime.NODEJS_14_X,
      // handler-file name, code- folder name
      handler: "hitcounter.handler",
      code: lambda.Code.fromAsset("lambda"),
      environment: {
        DOWNSTREAM_FUNCTION_NAME: props.downstream.functionName,
        HITS_TABLE_NAME: table.tableName,
      },
    });

    // dynamodb:UpdateItem on resource: arn:aws:dynamodb:us-east-1:647966781979:table/Aws01Stack-HelloHitCounterHits7AAEBF80-HCT9QJPRES9Y because no identity-based policy allows the dynamodb:UpdateItem action
    // grant the lambda role read/write permissions to our table to avoid error above
    table.grantReadWriteData(this.handler);

    //not authorized to perform: lambda:InvokeFunction on resource: arn:aws:lambda:us-east-1:647966781979:function:Aws01Stack-HelloHandler2E4FBA4D-bNwBlXyHouiV because no identity-based policy allows the lambda:InvokeFunction action"
    // grant the lambda role invoke permissions to the downstream function
    props.downstream.grantInvoke(this.handler);
  }
}

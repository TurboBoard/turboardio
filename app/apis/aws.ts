import AWS from "aws-sdk";

AWS.config.update({
    accessKeyId: process.env.AMAZON_ACCESS_KEY_ID,
    secretAccessKey: process.env.AMAZON_SECRET_ACCESS_KEY,
    region: "us-east-1",
});

const cloudfront = new AWS.CloudFront();

const dynamoDB = new AWS.DynamoDB();

const s3 = new AWS.S3();

export default {
    cloudfront: {
        create_invalidation: async (params: AWS.CloudFront.CreateInvalidationRequest) => cloudfront.createInvalidation(params).promise(),
    },
    dynamo: {
        batch_write_items: async (params: AWS.DynamoDB.BatchWriteItemInput) => dynamoDB.batchWriteItem(params).promise(),
        delete_item: async (params: AWS.DynamoDB.DeleteItemInput) => dynamoDB.deleteItem(params).promise(),
        get_item: async (params: AWS.DynamoDB.GetItemInput) => dynamoDB.getItem(params).promise(),
        input: (value: any) => AWS.DynamoDB.Converter.input(value),
        marshall: (value: { [key: string]: any }) => AWS.DynamoDB.Converter.marshall(value),
        put_item: async (params: AWS.DynamoDB.PutItemInput) => dynamoDB.putItem(params).promise(),
        query: async (params: AWS.DynamoDB.QueryInput) => dynamoDB.query(params).promise(),
        scan: async (params: AWS.DynamoDB.ScanInput) => dynamoDB.scan(params).promise(),
        unmarshall: (item: AWS.DynamoDB.AttributeMap) => AWS.DynamoDB.Converter.unmarshall(item),
        update_item: async (params: AWS.DynamoDB.UpdateItemInput) => dynamoDB.updateItem(params).promise(),
    },
    s3: {
        delete: (params: AWS.S3.DeleteObjectRequest) => s3.deleteObject(params).promise(),
        upload: (params: AWS.S3.PutObjectRequest) => s3.upload(params).promise(),
    },
};

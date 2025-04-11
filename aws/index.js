const AWS = require('aws-sdk');
const dotenv = require('dotenv');

// Load AWS environment variables
dotenv.config({ path: '.env.aws' });

// Configure AWS SDK
AWS.config.update({
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

// Initialize AWS services
const s3 = new AWS.S3();
const cloudfront = new AWS.CloudFront();
const sqs = new AWS.SQS();
const sns = new AWS.SNS();
const cloudwatch = new AWS.CloudWatch();

// S3 operations
const s3Operations = {
  uploadContent: async (file, key) => {
    const params = {
      Bucket: process.env.S3_CONTENT_BUCKET,
      Key: key,
      Body: file,
      ContentType: file.type
    };
    return s3.upload(params).promise();
  },

  getSignedUrl: (key, expires = 3600) => {
    const params = {
      Bucket: process.env.S3_CONTENT_BUCKET,
      Key: key,
      Expires: expires
    };
    return s3.getSignedUrl('getObject', params);
  }
};

// CloudFront operations
const cloudfrontOperations = {
  createInvalidation: async (paths) => {
    const params = {
      DistributionId: process.env.CLOUDFRONT_DISTRIBUTION_ID,
      InvalidationBatch: {
        CallerReference: Date.now().toString(),
        Paths: {
          Quantity: paths.length,
          Items: paths
        }
      }
    };
    return cloudfront.createInvalidation(params).promise();
  }
};

// SQS operations
const sqsOperations = {
  sendVideoProcessingMessage: async (videoData) => {
    const params = {
      QueueUrl: process.env.SQS_VIDEO_PROCESSING_QUEUE,
      MessageBody: JSON.stringify(videoData)
    };
    return sqs.sendMessage(params).promise();
  },

  sendNotification: async (notification) => {
    const params = {
      QueueUrl: process.env.SQS_NOTIFICATIONS_QUEUE,
      MessageBody: JSON.stringify(notification)
    };
    return sqs.sendMessage(params).promise();
  }
};

// SNS operations
const snsOperations = {
  publishAlert: async (message, subject) => {
    const params = {
      TopicArn: process.env.SNS_ALERTS_TOPIC,
      Message: JSON.stringify(message),
      Subject: subject
    };
    return sns.publish(params).promise();
  }
};

// CloudWatch operations
const cloudwatchOperations = {
  putMetricData: async (metricName, value, unit = 'Count') => {
    const params = {
      Namespace: process.env.CLOUDWATCH_METRIC_NAMESPACE,
      MetricData: [{
        MetricName: metricName,
        Value: value,
        Unit: unit,
        Timestamp: new Date(),
        Dimensions: [
          {
            Name: 'Environment',
            Value: process.env.NODE_ENV
          }
        ]
      }]
    };
    return cloudwatch.putMetricData(params).promise();
  }
};

module.exports = {
  s3: s3Operations,
  cloudfront: cloudfrontOperations,
  sqs: sqsOperations,
  sns: snsOperations,
  cloudwatch: cloudwatchOperations
};
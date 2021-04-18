const Creds = {
    awsRegion : process.env.AWS_REGION,
    awsAccessKeyId : process.env.AWS_ACCESS_KEY_ID,
    awsSecretAccessKey : process.env.AWS_SECRET_ACCESS_KEY,
    awsSessionToken : process.env.AWS_SESSION_TOKEN,
    awsCognitoIdentityPoolId : process.env.AWS_COGNITO_IDENTITY_POOL_ID
}

module.exports.Creds = Creds;
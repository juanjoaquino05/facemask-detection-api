const {Creds} = require('./Creds')

// Import required AWS SDK clients and commands for Node.js
const {
  RekognitionClient,
  DetectFacesCommand,
  DetectProtectiveEquipmentCommand,
} = require("@aws-sdk/client-rekognition")
const { CognitoIdentityClient } = require("@aws-sdk/client-cognito-identity")
const {
  fromCognitoIdentityPool,
} = require("@aws-sdk/credential-provider-cognito-identity")

// import entire SDK
const AWS = require('aws-sdk')

const creds = new AWS.Credentials(
  Creds.awsAccessKeyId, 
  Creds.awsSecretAccessKey, 
  Creds.awsSessionToken)

const params = {
  // credentials: creds,
  Region: Creds.awsRegion, // The AWS Region.
  identityPoolID: Creds.awsCognitoIdentityPoolId, // Amazon Cognito Identity Pool ID.
}
  
// Create an Amazon Transcribe service client object.
const client = new RekognitionClient({
  region: params.Region,
  credentials: fromCognitoIdentityPool({
    client: new CognitoIdentityClient({ credentials: creds, region: params.Region, }),
    identityPoolId: params.identityPoolID,
  }),
})
  
const ImageAnalyze = class  {

  // Calls DetectProtection API and shows detected faces with required equipment.
  DetectProtection = async (imageData) => {
    // Set the parameters.
    const params = {
      Image: {
        Bytes: imageData,
      },
      SummarizationAttributes: {
        MinConfidence: 80,
        RequiredEquipmentTypes: ["FACE_COVER"]
      }
    }
    
    try {
      const data = await client.send(new DetectProtectiveEquipmentCommand(params))

      return data
    } catch (err) {
      console.log("Error", err)
    }
  }

  
    
  // Loads selected image and unencodes image bytes for Rekognition DetectFaces API.
  ProcessImage = async (file) => {
    const result = {
      isTheEmployeeWearingMask : false,
      isThereAPersonInImage : false
    }

    const faces = await this.DetectProtection(file)
    console.log(faces)

    if(faces.$metadata.httpStatusCode === 200){
      const personInPicture = faces.Persons.length === 1
      const personWithMask = faces.Summary.PersonsWithRequiredEquipment.length > 0

      result.isThereAPersonInImage = personInPicture
      result.isTheEmployeeWearingMask = personInPicture && personWithMask
    }
    return result
  }

}

module.exports.ImageAnalyze = ImageAnalyze 
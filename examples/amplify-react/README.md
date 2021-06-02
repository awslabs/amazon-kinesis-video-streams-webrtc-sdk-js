
An example project for KVS WebRTC. This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app) and was built to work with [Amplify](https://docs.amplify.aws/). AWS services that this project integrates with are Cognito for user authentication and authorization, and Amazon Kinesis Video Streams for WebRTC.

## Requirements

* AWS Account
* [Amplify CLI](https://docs.amplify.aws/cli/start/install)
* [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-install.html)
* [nodejs](https://nodejs.org/en/download/)

## Bootstrap the Project

Install the project dependencies:

```bash
cd examples/amplify-react
npm install
```

Configure Amplify by setting your default region and providing an AWS key pair to use within your project. If you need specific instructions as to how to configure a user and to obtain an AWS key pair, please see the [following instructions](https://docs.amplify.aws/cli).

```bash
amplify configure
```

Initialize the project resources. Follow the prompts and select the default values for each. This step will take a few minutes as it is initializing a few of the cloud resources that will be used for your project.

```bash
amplify init
```

Next, we will enable Cognito authentication in the project. Execute the following command and select `Default configuration` for "authentication and security configuration", and `Email` for "How do you want users to be able to sign in".  

```bash
amplify add auth
amplify push
```

## Add KVS WebRTC Permissions the Default Cognito Auth Role

Open the file `amplify/team-provider-info.json` and copy the value for the field named `AuthRoleName`. This value will be used as the `AUTH_ROLE_NAME` variable in the script below that you will execute to grant KVS WebRTC permissions to all users that login to your web application via Cognito by default.

Please note that this will allow any users that access this web app to access any KVS WebRTC stream. This is not a recommended configuration for production implementations. Instead, the recommended approach is to make use of IAM roles with policy placeholder variables that allow access only to KVS WebRTC streams that users _should_ have access to according to your application's security design. You may wish to make use of specific [IAM roles](https://docs.aws.amazon.com/cognito/latest/developerguide/iam-roles.html) or [Role-Based Access Control](https://docs.aws.amazon.com/cognito/latest/developerguide/role-based-access-control.html) policies in your Cognito identity pools.


```bash
ACCOUNT_ID=$(aws --output text sts get-caller-identity --query 'Account')
AWS_REGION=$(aws configure get region)
KVS_VIEWER_IAM_POLICY_NAME=KvsWebRTCStreamViewerPolicy
AUTH_ROLE_NAME={{REPLACE_ME_AUTH_ROLE_NAME_FROM_TEAM_PROVIDER_INFO_JSON}}

# Generate the IAM Policy document
KVS_VIEWER_IAM_POLICY="{
    \"Version\": \"2012-10-17\",
    \"Statement\": [
        {
            \"Effect\": \"Allow\",
            \"Action\": [
                \"kinesisvideo:GetSignalingChannelEndpoint\",
                \"kinesisvideo:GetIceServerConfig\",
                \"kinesisvideo:ConnectAsViewer\",
                \"kinesisvideo:DescribeSignalingChannel\"
            ],
            \"Resource\": \"arn:aws:kinesisvideo:${AWS_REGION}:${ACCOUNT_ID}:channel/*/*\"
        }
    ]
}"

# Create the IAM Policy and capture its ARN for use in the next command
KVS_VIEWER_IAM_POLICY_ARN=$(aws iam create-policy \
  --policy-name $KVS_VIEWER_IAM_POLICY_NAME \
  --policy-document $KVS_VIEWER_IAM_POLICY \
  --output text \
  --query 'Policy.Arn')

# Attach the IAM Policy to your default Cognito Auth Role
aws iam attach-role-policy \
  --role-name $AUTH_ROLE_NAME \
  --policy-arn $KVS_VIEWER_IAM_POLICY_ARN

# List the attached policies for your default Cognito Auth Role to verify that it worked
aws iam list-attached-role-policies \
  --role-name $AUTH_ROLE_NAME
```


## Run the Project

After the cloud resources have been initialized, and the local Amplify project has been configured, you can run the project locally by executing the following command: `amplify serve`. This will run the React webapp in a local webserver which you can access in your browser by navigating to http://localhost:3000

When running the application for the first time, you will need to register yourself as a user. To do this, click the `Create account` link on the homepage. Enter your email address, a password, and your phone number. You will be required to verify your account via an email that will be sent to the address you use to register.

This web application assumes that you also have a device configured to produce a video stream on a well-known signaling channel name. In order to view the video stream, enter the Channel Name for your device in the channel field. If you are unsure of your device's signaling channel name, you can view the list of available channel names in the [KVS Console](https://console.aws.amazon.com/signalingChannels).

After you have entered your signaling channel name in the appropriate form field, click the `Start Viewer` button to begin viewing the live video stream.


## Cleanup

To delete all of the resources that were created as part of this project, execute the following commands:

```bash
AUTH_ROLE_NAME={{REPLACE_ME_AUTH_ROLE_NAME_FROM_TEAM_PROVIDER_INFO_JSON}}
KVS_VIEWER_IAM_POLICY_ARN=$(aws iam list-policies \
  --only-attached \
  --query 'Policies[?PolicyName==`KvsWebRTCStreamViewerPolicy`].{ARN:Arn}' \
  --output text)

aws iam detach-role-policy \
  --role-name $AUTH_ROLE_NAME \
  --policy-arn $KVS_VIEWER_IAM_POLICY_ARN

aws iam delete-policy \
  --policy-arn $KVS_VIEWER_IAM_POLICY_ARN

amplify delete
```

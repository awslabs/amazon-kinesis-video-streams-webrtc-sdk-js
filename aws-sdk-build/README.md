# Building the browser script version of AWS SDK for JS v3

This module bundles the **AWS SDK v3** clients into a single JavaScript file that can be imported in a `<script>` tag, similar to how AWS SDK v2 worked.
* [Kinesis Video](https://docs.aws.amazon.com/kinesisvideostreams/latest/dg/API_Operations_Amazon_Kinesis_Video_Streams.html) client
* [Kinesis Video Signaling Channels](https://docs.aws.amazon.com/kinesisvideostreams/latest/dg/API_Operations_Amazon_Kinesis_Video_Signaling_Channels.html) client
* [Kinesis Video WebRTC Storage](https://docs.aws.amazon.com/kinesisvideostreams/latest/dg/API_Operations_Amazon_Kinesis_Video_WebRTC_Storage.html) client

## **Installation**

Before building, ensure you have **Node.js** installed.

### **1. Install Dependencies**
Run the following command in this directory:

```sh
npm install
```

### **2. Build the SDK**
Generate the bundled JavaScript file by running:

```sh
npm run build
```

This creates the file:
```
dist/aws-sdk-VERSION-kvswebrtc.js
```

> [!NOTE]
> `VERSION` will be replaced with the bundled AWS SDK version. For example: 3.758.0

## **Usage in HTML**
Once built, include the script in your HTML file:

```html
<script src="dist/aws-sdk-VERSION-kvswebrtc.js"></script>
```

After that, the `AWS` object is globally available, just like AWS SDK v2.

> [!NOTE]
> AWS SDK for JS v3 uses different syntax than v2. Refer to the [documentation](https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/client/kinesis-video/) for the syntax and usage.

## **Updating the AWS SDK for JS v3 to the latest**

If you need to update the AWS SDK clients, modify `package.json` and run:

```sh
npm update
```

Then, rebuild the bundle:

```sh
npm run build
```

You can now use it to the `examples`:
```shell
mv ./dist/aws-sdk-*-kvswebrtc.js ../examples
```

> [!NOTE]
> You will also need to modify the `<script>` import in `examples/index.html` to pull the new file.

## **Troubleshooting**
- If `npm run build` fails, try deleting `node_modules` and `package-lock.json`, then reinstall:
  ```sh
  rm -rf node_modules package-lock.json
  npm install
  ```
- Ensure Webpack is installed by running:
  ```sh
  npx webpack -v
  ```

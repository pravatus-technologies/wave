<img src="./mobile/assets/images/icon.png" height=128 margin="auto"/>

<h1>Wave</h1>

<p>Wave Social from Pravatus Technologies</p>

<h2>Folder Structure</h2>
<p>The project is composed of two main projects and one documentation folder</p>
<ul>
  <li><p><strong>mobile</strong>- this contains the React Native mobile application project</p></li>
  <li><p><strong>api-dev</strong>- this is the nodejs express backend api for feeding mock data into the app. As of now it only loads posts in the homescreen</p></li>
  <li><p><string>docs</strong>- this is the documentation folder. Anything relevant to document, put it here</p></li>
</ul>

<h2>Build Instruction</h2>
<p>The mobile app project is running on hybrid workflow (bare + expo managed) in order to use the React Native Firebase native modules. This app also has customized build flow as defined in app.config.js that determines what environment to build into according to the APP_ENV environment variable</p>
<p>If you're going to run the development build on your simulator, you'll need to issue the following command first: npx expo run:ios<p>
<p>After that it will create a development build and install it on the simulator. You can also use npx expo build --profile "development|preview|production" and use EAS build service to download a development build.</p>
<p>Always use the correct device profile especially with IOS. If you have a phone you want to use, make sure to run npx expo create:device and create a new device profile. This will use your Apple Developer account if building for IOS. Make sure your Apple Developer account is current.</p>
<p>You can manage your devices from within developer.apple.com</p>

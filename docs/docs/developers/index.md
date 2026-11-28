---
slug: /configuration-contributors
title: "Translate the Web Interface"
sidebar_label: "Contributors"
description: "How to contribute a translation of the UAVcast-Pro web interface by forking the translations repository and editing a language file."
authors: Bernt Christian Egeland
tags: []
sidebar_position: 8
---


* Fork the [https://github.com/UAVmatrix/uavcast-pro-translations](https://github.com/UAVmatrix/uavcast-pro-translations) project.
* Download a proper text editor on your computer, example [Microsoft studio Code](https://code.visualstudio.com/) 
* Download **en.json** to your computer, and make a copy of that file with the language abbreviation you want to use. example  "fr.json for france".
* Make the changes you want use. Only change the text on right hand side of :

#### Example en.json
```javascript
"headerLinks":{
    "community":"Community",
    "documentation":"Documentation"
  }
```
For Norwegian language, this file would have been edited like
```javascript
"headerLinks":{
    "community":"Samfunnet",
    "documentation":"Dokumentasjon"
  }
```

* when you have completed the file, upload it to your forked version on github. 
* then go to [https://github.com/UAVmatrix/uavcast-pro-translations](https://github.com/UAVmatrix/uavcast-pro-translations) and press merge request.

* Or you can send the file to support@uavmatrix.com
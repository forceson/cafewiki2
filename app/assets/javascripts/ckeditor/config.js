CKEDITOR.editorConfig = function (config) {
  // ... other configuration ...
  config.language = 'ko';
	config.uiColor = '#ffffff';
	config.height = 300;
	config.toolbarCanCollapse = true;
	config.extraPlugins = 'imageresize';
	config.font_names =
    '나눔고딕;' +
    '나눔명조;' +
    '본고딕;' +
    'KoPub Batang;' +
    'Hanna';
	config.font_defaultLabel = '본고딕';
  config.toolbar = 'content';
  config.toolbar_content = [
    ['Font','FontSize','Format', "Bold",  "Italic",  "Underline",  "Strike", 'TextColor', 'BGColor',  "-", 'JustifyLeft', 'JustifyCenter', 'JustifyRight', "-", 'SpecialChar', 'Link', 'Image', 'HorizontalRule', 'Blockquote'],
  ];
  config.toolbar = "simple";
  // ... rest of the original config.js  ...
  // config.toolbar = 'editor1';
  // config.toolbar_editor1 =
  //     [
  //         ['Cut','Copy','Paste','PasteText'],
  //     ];
      
  // config.toolbar = 'editor2';
  // config.toolbar_editor2 =
  //     [
  //         ["Bold",  "Italic",  "Underline",  "Strike",  "-",  "Subscript",  "Superscript"],
  //     ];
    
}
CKEDITOR.on('dialogDefinition', function (ev) {
  // Take the dialog name and its definition from the event data.
  var dialogName = ev.data.name;
  var dialogDefinition = ev.data.definition;

  // Check if the definition is from the dialog we're
  // interested in (the 'link' dialog).
  if (dialogName == 'link') {
      // Remove the 'Advanced' tabs from the 'Link' dialog.        
      dialogDefinition.removeContents('advanced');

      dialogDefinition.removeContents('target');

      // Get a reference to the 'Link Info' tab.
      var infoTab = dialogDefinition.getContents('info');

      // Remove unnecessary widgets from the 'Link Info' tab.         
      // infoTab.remove('linkType');
      //infoTab.remove('browse');

      
  }
  
  if (dialogName == 'image') {
      // Remove the 'Advanced' tabs from the 'Link' dialog.        
      dialogDefinition.removeContents('advanced');
      dialogDefinition.removeContents('target');
      dialogDefinition.removeContents('Link');
      // Get a reference to the 'Link Info' tab.
      var infoTab = dialogDefinition.getContents('info');

      // Remove unnecessary widgets from the 'Link Info' tab.         
      // infoTab.remove('linkType');
      //infoTab.remove('browse');

      
  }
})
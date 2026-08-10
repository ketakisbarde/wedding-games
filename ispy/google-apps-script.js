/**
 * Google Apps Script — Deploy as Web App
 * 
 * SETUP INSTRUCTIONS:
 * 1. Go to https://script.google.com → New Project
 * 2. Paste this entire file
 * 3. Replace FOLDER_ID below with your Drive folder ID
 *    (from https://drive.google.com/drive/folders/1rCRUADjqBGlzF9tzTkvQj9b_WNlXdTm1
 *     the ID is: 1rCRUADjqBGlzF9tzTkvQj9b_WNlXdTm1)
 * 4. Click Deploy → New Deployment
 * 5. Type: Web App
 * 6. Execute as: Me
 * 7. Who has access: Anyone
 * 8. Click Deploy → Copy the URL
 * 9. Paste the URL into ispy/index.html where it says APPS_SCRIPT_URL
 */

const FOLDER_ID = '1rCRUADjqBGlzF9tzTkvQj9b_WNlXdTm1';

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const blob = Utilities.newBlob(
      Utilities.base64Decode(data.image),
      'image/jpeg',
      data.filename
    );
    
    const folder = DriveApp.getFolderById(FOLDER_ID);
    const file = folder.createFile(blob);
    
    return ContentService
      .createTextOutput(JSON.stringify({ success: true, fileId: file.getId() }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: err.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({ status: 'ok', message: 'I Spy Upload endpoint active' }))
    .setMimeType(ContentService.MimeType.JSON);
}

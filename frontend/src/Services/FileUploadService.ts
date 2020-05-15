// Import Config for getting SERVER URL
import Config from '../Config';

// Importing Network service to make post request and Log service to make log in the console
import { NetworkServices, LogServices } from './index';

// Declare Logger for generating Logs for FileUpload Service
const logger = LogServices.getInstance('FileUploadService');

class FileUploadService {
  async uploadFile(UploadedFile: any, Description: any, projectId: any) {
    let response = await NetworkServices.post(
      `${Config.SERVER_URL}/students/uploadProjectFiles/${projectId}`,
      { UploadedFile, Description }
    );
    if (response) {
      console.log('FileUploadService Success', response);
    } else {
      console.log('FileUploadService ERROR', response);
    }
    logger.debug(response);
    return response;
  }
}

export default new FileUploadService();

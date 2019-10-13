import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { FilePond, registerPlugin } from 'react-filepond';
import FilePondPluginFileRename from 'filepond-plugin-file-rename';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import FilePondPluginImageCrop from 'filepond-plugin-image-crop';
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImageValidateSize from 'filepond-plugin-image-validate-size';
import 'filepond/dist/filepond.min.css';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css';
registerPlugin(
  FilePondPluginFileRename,
  FilePondPluginImagePreview,
  FilePondPluginImageCrop,
  FilePondPluginImageExifOrientation,
  FilePondPluginImageValidateSize
);

class FileUpload extends Component {
  constructor(props) {
    super(props);

    //Set initial files, type 'local' means this is a file that has already been uploaded to the server (see docs).
    this.state = {
      files: [
        // {
        //   source: "index.html",
        //   options: {
        //     type: "local",
        //     file: {
        //       name: 'my-file.png',
        //       size: 3001025,
        //       type: 'image/png'
        //     }
        //   }
        // }
      ]
    };
  }

  handleInit() {
    console.log("FilePond instance has initialised", this.pond);
  }


  render() {
    return (
      <div>
        <FilePond
          // Core module
          element={null}
          status={0}
          name={'filepond'}
          className={null}
          required={false}
          disabled={false}
          allowDrop={true}
          allowBrowse={true}
          allowPaste={true}
          allowMultiple={true}
          allowReplace={true}
          allowRevert={true}
          forceRevert={false}
          maxParallelUploads={null}
          checkValidity={false}
          maxFiles={3}
          itemInsertLocation={'before'/*'after'*/} //can use sort()
          itemInsertInterval={75}
          // Drag n’ Drop related
          dropOnPage={false}
          dropOnElement={true}
          dropValidation={false}
          ignoredFiles={['.ds_store', 'thumbs.db', 'desktop.ini']}
          // Server configuration
          files={this.state.files}
          instantUpload={false}//Immediately upload new files to the server (button upload)
          server="http://localhost:3000/records/upload"
          chunkUploads={false}
          chunkForce={false}
          chunkSize={5000000}
          chunkRetryDelays={[500, 1000, 3000]}
          // Labels
          labelIdle={'Drag & Drop your picture or <span class="filepond--label-action">Browse</span>'}
          labelInvalidField={'Field contains invalid files'}
          labelFileWaitingForSize={'Waiting for size'}
          labelFileSizeNotAvailable={'Size not available'}
          labelFileLoading={'Loading'}
          labelFileLoadError={'Error during load'}
          labelFileProcessing={'Uploading'}
          labelFileProcessingComplete={'Upload complete'}
          labelFileProcessingAborted={'Upload cancelled'}
          labelFileProcessingError={'Error during upload'}
          labelFileProcessingRevertError={'Error during revert'}
          labelFileRemoveError={'Error during remove'}
          labelTapToCancel={'tap to cancel'}
          labelTapToRetry={'tap to retry'}
          labelTapToUndo={'tap to undo'}
          labelButtonRemoveItem={'Remove'}
          labelButtonAbortItemLoad={'Abort'}
          labelButtonRetryItemLoad={'Retry'}
          labelButtonAbortItemProcessing={'Cancel'}
          labelButtonUndoItemProcessing={'Undo'}
          labelButtonRetryItemProcessing={'Retry'}
          labelButtonProcessItem={'Upload'}
          // SVG Icons
          //iconRemove={'<svg></svg>'}
          //iconProcess={'<svg></svg>'}
          //iconRetry={'<svg></svg>'}
          //iconUndo={'<svg></svg>'}
          // Callbacks
          oninit={() => this.handleInit()}//()
          onwarning//(error[, file, status])
          onerror//(error[, file, status])
          onaddfilestart//(file)
          onaddfileprogress//(file, progress)
          onaddfile//	(error, file)
          onprocessfilestart//(file)
          onprocessfileprogress//(file, progress)
          onprocessfileabort//(file)
          onprocessfilerevert//(file)
          onprocessfile//(error, file)
          onprocessfiles//()
          onremovefile//(error, file)
          onpreparefile//(file, output)
          onupdatefiles={fileItems => {//(files)
            this.setState({
              files: fileItems.map(fileItem => fileItem.file)
            });
          }}
          onactivatefile//(file)
          // Hooks
          beforeDropFile//(file)
          beforeAddFile//(item)
          beforeRemoveFile//(item)
          // Styles
          stylePanelLayout={null}
          stylePanelAspectRatio={null}
          styleButtonRemoveItemPosition={'left'}
          styleButtonProcessItemPosition={'right'}
          styleLoadIndicatorPosition={'right'}
          styleProgressIndicatorPosition={'right'}
          styleItemPanelAspectRatio={null}
          //
          ref={ref => (this.pond = ref)}
          // FilePondPluginImagePreview (Plugin)
          allowImagePreview={true}
          imagePreviewMinHeight={44}
          imagePreviewMaxHeight={256}
          imagePreviewHeight={null}
          imagePreviewMaxFileSize={null}
          imagePreviewTransparencyIndicator={null}
          imagePreviewMaxInstantPreviewFileSize={1000000}
          imagePreviewMarkupShow={true}
          imagePreviewMarkupFilter//(markupItem) => true
          // FilePondPluginFileRename (Plugin)
          allowFileRename={true}
          fileRenameFunction={() => {return 'file'}}
          // FilePondPluginImageCrop
          allowImageCrop={true}
          imageCropAspectRatio={'1:1'}//'16:10'
          // FilePondPluginImageExifOrientation
          allowImageExifOrientation={true}
          // FilePondPluginImageValidateSize
          allowImageValidateSize={true}
          imageValidateSizeMinWidth={1}
          imageValidateSizeMaxWidth={65535}
          imageValidateSizeMinHeight={1}
          imageValidateSizeMaxHeight={65535}
          imageValidateSizeLabelFormatError={'Image type not supported'}
          imageValidateSizeLabelImageSizeTooSmall={'Image is too small'}
          imageValidateSizeLabelImageSizeTooBig={'Image is too big'}
          imageValidateSizeLabelExpectedMinSize={'Minimum size is {minWidth} × {minHeight}'}
          imageValidateSizeLabelExpectedMaxSize={'Maximum size is {maxWidth} × {maxHeight}'}
          imageValidateSizeMinResolution={null}
          imageValidateSizeMaxResolution={null}
          imageValidateSizeLabelImageResolutionTooLow={'Resolution is too low'}
          imageValidateSizeLabelImageResolutionTooHigh={'Resolution is too high'}
          imageValidateSizeLabelExpectedMinResolution={'Minimum resolution is {minResolution}'}
          imageValidateSizeLabelExpectedMaxResolution={'Maximum resolution is {maxResolution}'}
          imageValidateSizeMeasure={null}//function
        />
      </div>
    );
  }
}

FileUpload.propTypes = {
  // user: PropTypes.object.isRequired
};

export default FileUpload;

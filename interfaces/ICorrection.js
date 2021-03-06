const moment = require('moment');

class ICorrectionDTO {
  constructor(correction_info){
    this.__id = correction_info._id;
    this._post_id = correction_info.post_id;
    this._correction_by = correction_info.correction_by;
    this._correction_context = correction_info.correction_context;
    this._additional_text = correction_info.additional_text,
    this._register_date = correction_info.register_date;
    this._delete_date = correction_info.delete_date;
    this._del_ny = correction_info.del_ny;
    this._annotation_size = 0;
  }

  set annotaion_size(size){
    this._annotation_size = size;
  }

  get CorrectionInfo(){
    return {
      _id : this.__id,
      post_id : this._post_id,
      correction_by : this._correction_by,
      correction_context : this._correction_context,
      additional_text : this._additional_text,
      register_date : this._register_date,
      delete_date : this._delete_date,
      del_ny: this._del_ny,
      annotion_size : this._annotation_size
    }
  }

  getCheckUploadInfo(){
    return {
      post_id: this._post_id,
      correction_by: this._correction_by,
      correction_context : this._correction_context
    }
  }

  getUploadCorrectionInfo(){
    return {
      post_id: this._post_id,
      correction_by: this._correction_by,
      correction_context : this._correction_context,
      additional_text : this._additional_text,
      register_date : moment().format()
    }
  }

  getDeleteCorrectionInfo(){
    return{
      _id : this.__id,
      correction_by : this._correction_by,
      post_id : this._post_id,
      delete_register: moment().format(),
      del_ny: true
    }
  }

  getReturnOneCorrectionInfo(){
    return {
      _id : this.__id,
      correction_by: this._correction_by,
      correction_context: this._correction_context,
      additional_text: this._additional_text,
      del_ny : this._del_ny,
      register_date : this._register_date,
      annotation_size : this._annotation_size
    }
  }
}

class ICorrectionListDTO extends ICorrectionDTO{
  constructor(correction_info){
    super(correction_info);
    this._page_index = parseInt(correction_info.page_index);
    this._page_size = parseInt(correction_info.page_size);
  }

  get CorrectionSearchOptionInfo(){
    return {
      post_id : super.CorrectionInfo.post_id,
      page_index : this._page_index,
      page_size: this._page_size
    }
  }
}

module.exports = {
  ICorrectionDTO, ICorrectionListDTO
}

import { Injectable } from '@angular/core';

@Injectable()
export class LangService {

  constructor() { }

  danh_muc_phu_tung = {
    button : {
      search : 'Search',
      export : 'Export',
      new_category : 'New Category',
      unit_of_work : 'Unit of Work'
    }
  };
}

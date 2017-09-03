import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { Subscriber } from 'rxjs'
import { Observable } from 'rxjs/Observable'
import { Subject } from 'rxjs/Subject'

import {MenuItem} from 'primeng/primeng';

import { SVGCacheService } from 'ng-inline-svg';

@Component({
  templateUrl: './space2-detail.html',
  styleUrls: ['./space2-detail.scss']
})
export class Space2Detail implements OnInit {

  items: MenuItem[];

  constructor(private router: Router,
              private svgService: SVGCacheService) {
    svgService.setBaseUrl({ baseUrl: 'http://localhost:8881/' });
 }




  ngOnInit() {
    

    this.items = [
      {
          label: 'File',
          icon: 'fa-file-o',
          items: [{
                  label: 'New', 
                  icon: 'fa-plus',
                  items: [
                      {label: 'Project'},
                      {label: 'Other'},
                  ]
              },
              {label: 'Open'},
              {label: 'Quit'}
          ]
      },
      {
          label: 'Edit',
          icon: 'fa-edit',
          items: [
              {label: 'Undo', icon: 'fa-mail-forward'},
              {label: 'Redo', icon: 'fa-mail-reply'}
          ]
      },
      {
          label: 'Help',
          icon: 'fa-question',
          items: [
              {
                  label: 'Contents'
              },
              {
                  label: 'Search', 
                  icon: 'fa-search', 
                  items: [
                      {
                          label: 'Text', 
                          items: [
                              {
                                  label: 'Workspace'
                              }
                          ]
                      },
                      {
                          label: 'File'
                      }
              ]}
          ]
      },
      {
          label: 'Actions',
          icon: 'fa-gear',
          items: [
              {
                  label: 'Edit',
                  icon: 'fa-refresh',
                  items: [
                      {label: 'Save', icon: 'fa-save'},
                      {label: 'Update', icon: 'fa-save'},
                  ]
              },
              {
                  label: 'Other',
                  icon: 'fa-phone',
                  items: [
                      {label: 'Delete', icon: 'fa-minus'}
                  ]
              }
          ]
      }
  ];


  }


  onBackButton() {
    this.router.navigate(['/dashboard']);
  }
}
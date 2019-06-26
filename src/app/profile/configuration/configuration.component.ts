import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { MirrorService } from '@app/shared/services/mirror.service';
import { ModulesService } from '@app/shared/services/modules.service';
import { ConfigurationService } from '@app/shared/services/configuration.service';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['../profile.component.scss', './configuration.component.scss']
})
export class ConfigurationComponent implements OnInit {
  userProfile: any;

  modules:any = [];
  mirrors:any = [];
  configurations = {global: {}, individual: []};

  configuration_template = {
    name: '',
    mirror_id: undefined,
    session_expiration: 0,
    module_ne: undefined,
    module_se: undefined,
    module_so: undefined,
    module_no: undefined,
    module_ne_conf: '',
    module_se_conf: '',
    module_so_conf: '',
    module_no_conf: '',
    is_global: false
  };

  constructor(public activatedRoute: ActivatedRoute,
              private mirrorService: MirrorService,
              private modulesService: ModulesService,
              private configurationService: ConfigurationService) {}

  ngOnInit() {
    this.activatedRoute.parent.data.subscribe((data) => {
      this.userProfile = data.userProfile;
    });

    let promiseMirrors = this.mirrorService.getUserMirrors().then(result => this.mirrors = result);
    let promiseModules = this.modulesService.getModules().then(result => this.modules = result);

    Promise.all([promiseMirrors, promiseModules]).then(values => {
      this.configurationService.getUserConfigurations().then(
        result => {
          let _configurations = result;
          for (let configuration of _configurations) {
            configuration['mirror'] = this.mirrors.find(function(m) {return m.id == configuration.mirror_id});
            configuration['module_ne'] = this.modules.find(function(m) {return m.id == configuration.module_ne});
            configuration['module_se'] = this.modules.find(function(m) {return m.id == configuration.module_se});
            configuration['module_so'] = this.modules.find(function(m) {return m.id == configuration.module_so});
            configuration['module_no'] = this.modules.find(function(m) {return m.id == configuration.module_no});
          }

          this.configurations.global = _configurations.find(function(c) {return c.is_global});
          this.configurations.individual = _configurations.filter(c => !c.is_global);

          if (!this.configurations.global) {
            this.configurations.global = Object.assign({}, this.configuration_template);
            this.configurations.global['is_global'] = true;
          }
        }
      );
    });
  }

}

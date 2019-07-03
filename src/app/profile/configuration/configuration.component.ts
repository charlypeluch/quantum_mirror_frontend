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
  mirrors_availables:any = [];
  configuration = {global: [], individual: []};

  configuration_template = {
    mirror_id: undefined,
    user_id: undefined,
    name: undefined,
    session_expiration: 0,
    module_no: undefined,
    module_ne: undefined,
    module_so: undefined,
    module_se: undefined,
    module_ne_conf: undefined,
    module_se_conf: undefined,
    module_so_conf: undefined,
    module_no_conf: undefined,
    is_global: false
  };

  template_global:boolean = false;
  template_individual:boolean = false;
  configuration_global = Object.assign({}, this.configuration_template);
  configuration_individual = Object.assign({}, this.configuration_template);

  constructor(public activatedRoute: ActivatedRoute,
              private mirrorService: MirrorService,
              private modulesService: ModulesService,
              private configurationService: ConfigurationService) {}

  ngOnInit() {
    this.activatedRoute.parent.data.subscribe((data) => {
      this.userProfile = data.userProfile;
    });
    this.getData();
  }

  toggleModule(module, configuration) {
    if (module.name == 'Módulo de Reloj')
      configuration.module_no = configuration.module_no == module.id ? undefined: module.id;
    else if (module.name == 'Módulo de Clima')
      configuration.module_ne = configuration.module_ne == module.id ? undefined: module.id;
    else if (module.name == 'Módulo de Noticias')
      configuration.module_so = configuration.module_so == module.id ? undefined: module.id;
    else if (module.name == 'Módulo de Calendario')
      configuration.module_se = configuration.module_se == module.id ? undefined: module.id;
  }

  postUserConfiguration(type:string) {
    let _configuration_template;

    if (type == "global") {
      _configuration_template = this.configuration_global;
      _configuration_template.is_global = true;
    }
    else if (type == "individual") {
      _configuration_template = this.configuration_individual;
      _configuration_template.is_global = false;
    }

    _configuration_template.user_id = this.userProfile.id;
    _configuration_template.module_ne_conf = {city: _configuration_template.module_ne_conf};

    this.configurationService.postUserConfiguration(_configuration_template).then(result => {
      this.template_global = false;
      this.template_individual = false;
      this.configuration_global = Object.assign({}, this.configuration_template);
      this.configuration_individual = Object.assign({}, this.configuration_template);

      this.getData();
    });
  }

  deleteUserConfiguration(configurationId) {
    this.configurationService.deleteUserConfiguration(configurationId).then(result => {this.getData()});
  }

  getData() {
    let promiseMirrors = this.mirrorService.getUserMirrors().then(result => this.mirrors = result);
    let promiseModules = this.modulesService.getModules().then(result => this.modules = result);

    Promise.all([promiseMirrors, promiseModules]).then(values => {
      let _mirrors = [];

      this.configurationService.getUserConfigurations().then(
        result => {
          let _configurations = result;
          this.mirrors_availables = this.mirrors;
          
          for (let configuration of _configurations) {
            configuration['mirror'] = this.mirrors.find(function(m) {return m.id == configuration.mirror_id});
            configuration['module_no'] = this.modules.find(function(m) {return m.id == configuration.module_no});
            configuration['module_ne'] = this.modules.find(function(m) {return m.id == configuration.module_ne});
            configuration['module_so'] = this.modules.find(function(m) {return m.id == configuration.module_so});
            configuration['module_se'] = this.modules.find(function(m) {return m.id == configuration.module_se});

            if (configuration.mirror)
              _mirrors.push(configuration.mirror);

            this.mirrors_availables = this.mirrors.filter(function(m) {
              return _mirrors.indexOf(m) < 0;
            });
          }

          this.configuration.global = _configurations.filter(c => c.is_global);
          this.configuration.individual = _configurations.filter(c => !c.is_global);
        }
      );
    });
  }
}

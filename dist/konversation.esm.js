import axios from 'axios';

//
//
//
//

var script = {
    props: ['href', 'label']
};

function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier
/* server only */
, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
  if (typeof shadowMode !== 'boolean') {
    createInjectorSSR = createInjector;
    createInjector = shadowMode;
    shadowMode = false;
  } // Vue.extend constructor export interop.


  var options = typeof script === 'function' ? script.options : script; // render functions

  if (template && template.render) {
    options.render = template.render;
    options.staticRenderFns = template.staticRenderFns;
    options._compiled = true; // functional template

    if (isFunctionalTemplate) {
      options.functional = true;
    }
  } // scopedId


  if (scopeId) {
    options._scopeId = scopeId;
  }

  var hook;

  if (moduleIdentifier) {
    // server build
    hook = function hook(context) {
      // 2.3 injection
      context = context || // cached call
      this.$vnode && this.$vnode.ssrContext || // stateful
      this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext; // functional
      // 2.2 with runInNewContext: true

      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__;
      } // inject component styles


      if (style) {
        style.call(this, createInjectorSSR(context));
      } // register component module identifier for async chunk inference


      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier);
      }
    }; // used by ssr in case component is cached and beforeCreate
    // never gets called


    options._ssrRegister = hook;
  } else if (style) {
    hook = shadowMode ? function () {
      style.call(this, createInjectorShadow(this.$root.$options.shadowRoot));
    } : function (context) {
      style.call(this, createInjector(context));
    };
  }

  if (hook) {
    if (options.functional) {
      // register for functional component in vue file
      var originalRender = options.render;

      options.render = function renderWithStyleInjection(h, context) {
        hook.call(context);
        return originalRender(h, context);
      };
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate;
      options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
    }
  }

  return script;
}

var normalizeComponent_1 = normalizeComponent;

var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
function createInjector(context) {
  return function (id, style) {
    return addStyle(id, style);
  };
}
var HEAD = document.head || document.getElementsByTagName('head')[0];
var styles = {};

function addStyle(id, css) {
  var group = isOldIE ? css.media || 'default' : id;
  var style = styles[group] || (styles[group] = {
    ids: new Set(),
    styles: []
  });

  if (!style.ids.has(id)) {
    style.ids.add(id);
    var code = css.source;

    if (css.map) {
      // https://developer.chrome.com/devtools/docs/javascript-debugging
      // this makes source maps inside style tags work properly in Chrome
      code += '\n/*# sourceURL=' + css.map.sources[0] + ' */'; // http://stackoverflow.com/a/26603875

      code += '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) + ' */';
    }

    if (!style.element) {
      style.element = document.createElement('style');
      style.element.type = 'text/css';
      if (css.media) { style.element.setAttribute('media', css.media); }
      HEAD.appendChild(style.element);
    }

    if ('styleSheet' in style.element) {
      style.styles.push(code);
      style.element.styleSheet.cssText = style.styles.filter(Boolean).join('\n');
    } else {
      var index = style.ids.size - 1;
      var textNode = document.createTextNode(code);
      var nodes = style.element.childNodes;
      if (nodes[index]) { style.element.removeChild(nodes[index]); }
      if (nodes.length) { style.element.insertBefore(textNode, nodes[index]); }else { style.element.appendChild(textNode); }
    }
  }
}

var browser = createInjector;

/* script */
var __vue_script__ = script;

/* template */
var __vue_render__ = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("a", {
    staticClass: "konversation-message-attachement",
    attrs: { type: "button", href: _vm.href },
    domProps: { innerHTML: _vm._s(_vm.label) }
  })
};
var __vue_staticRenderFns__ = [];
__vue_render__._withStripped = true;

  /* style */
  var __vue_inject_styles__ = function (inject) {
    if (!inject) { return }
    inject("data-v-7a874a3a_0", { source: ".konversation .konversation-message .konversation-message-attachement {\n  display: block;\n  background: white;\n  border-radius: 5px;\n  padding: 5px 10px;\n  color: black;\n  text-decoration: none;\n  margin-top: 10px;\n}\n\n/*# sourceMappingURL=Attachement.vue.map */", map: {"version":3,"sources":["C:\\Users\\Anis\\Desktop\\konversation\\src\\components\\Attachement.vue","Attachement.vue"],"names":[],"mappings":"AAWA;EAGA,cAAA;EACA,iBAAA;EACA,kBAAA;EACA,iBAAA;EACA,YAAA;EACA,qBAAA;EACA,gBAAA;AAAA;;ACXA,0CAA0C","file":"Attachement.vue","sourcesContent":["<template>\r\n    <a type=\"button\" class=\"konversation-message-attachement\" :href=\"href\" v-html=\"label\"></a>\r\n</template>\r\n\r\n<script>\r\nexport default {\r\n    props: ['href', 'label']\r\n}\r\n</script>\r\n\r\n<style lang=\"scss\">\r\n.konversation {\r\n    .konversation-message {\r\n        .konversation-message-attachement {\r\n            display: block;\r\n            background: white;\r\n            border-radius: 5px;\r\n            padding: 5px 10px;\r\n            color: black;\r\n            text-decoration: none;\r\n            margin-top: 10px;\r\n        }\r\n    }\r\n}\r\n</style>\r\n",".konversation .konversation-message .konversation-message-attachement {\n  display: block;\n  background: white;\n  border-radius: 5px;\n  padding: 5px 10px;\n  color: black;\n  text-decoration: none;\n  margin-top: 10px; }\n\n/*# sourceMappingURL=Attachement.vue.map */"]}, media: undefined });

  };
  /* scoped */
  var __vue_scope_id__ = undefined;
  /* module identifier */
  var __vue_module_identifier__ = undefined;
  /* functional template */
  var __vue_is_functional_template__ = false;
  /* style inject SSR */
  

  
  var Attachement = normalizeComponent_1(
    { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
    __vue_inject_styles__,
    __vue_script__,
    __vue_scope_id__,
    __vue_is_functional_template__,
    __vue_module_identifier__,
    browser,
    undefined
  );

//

var script$1 = {
    components: { Attachement: Attachement },
    props: ['type', 'content', 'avatar', 'attachements'],

    data: function data() {
        return {
            show: false
        }
    },

    mounted: function mounted() {
        this.show = true;
    }
};

/* script */
var __vue_script__$1 = script$1;

/* template */
var __vue_render__$1 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "div",
    {
      staticClass: "konversation-message",
      class: "konversation-message-" + _vm.type
    },
    [
      _c("transition-group", { attrs: { name: "fade" } }, [
        _c("span", {
          directives: [
            {
              name: "show",
              rawName: "v-show",
              value: _vm.show,
              expression: "show"
            }
          ],
          key: "avatar",
          staticClass: "konversation-message-avatar",
          domProps: { innerHTML: _vm._s(_vm.avatar) }
        }),
        _vm._v(" "),
        _c(
          "span",
          {
            directives: [
              {
                name: "show",
                rawName: "v-show",
                value: _vm.show,
                expression: "show"
              }
            ],
            key: "content",
            staticClass: "konversation-message-content"
          },
          [
            _vm._v("\n            " + _vm._s(_vm.content) + "\n            "),
            _vm._l(_vm.attachements, function(attachement, i) {
              return _c("Attachement", {
                key: i,
                attrs: { href: attachement.href, label: attachement.label }
              })
            })
          ],
          2
        )
      ])
    ],
    1
  )
};
var __vue_staticRenderFns__$1 = [];
__vue_render__$1._withStripped = true;

  /* style */
  var __vue_inject_styles__$1 = function (inject) {
    if (!inject) { return }
    inject("data-v-3cf18788_0", { source: ".konversation .konversation-message {\n  display: flex;\n}\n.konversation .konversation-message.konversation-message-bot > span {\n    width: 100%;\n    display: block;\n    display: flex;\n    flex-direction: row-reverse;\n}\n.konversation .konversation-message .konversation-message-avatar {\n    margin: 10px 0;\n}\n.konversation .konversation-message .konversation-message-content {\n    display: inline-block;\n    border-radius: 10px;\n    background: #efefef;\n    padding: 10px;\n    max-width: 300px;\n    top: 0;\n    margin: 0 10px;\n}\n.fade-enter-active, .fade-leave-active {\n  transition: opacity .5s;\n}\n.fade-enter, .fade-leave-to {\n  opacity: 0;\n}\n\n/*# sourceMappingURL=Message.vue.map */", map: {"version":3,"sources":["C:\\Users\\Anis\\Desktop\\konversation\\src\\components\\Message.vue","Message.vue"],"names":[],"mappings":"AAiCA;EAEA,aAAA;AAAA;AAFA;IAKA,WAAA;IACA,cAAA;IACA,aAAA;IACA,2BAAA;AAAA;AARA;IAYA,cAAA;AAAA;AAZA;IAgBA,qBAAA;IACA,mBAAA;IACA,mBAAA;IACA,aAAA;IACA,gBAAA;IACA,MAAA;IACA,cAAA;AAAA;AAKA;EACA,uBAAA;AAAA;AAGA;EACA,UAAA;AAAA;;ACzCA,sCAAsC","file":"Message.vue","sourcesContent":["<template>\r\n    <div class=\"konversation-message\" :class=\"`konversation-message-${type}`\">\r\n        <transition-group name=\"fade\">\r\n            <span key=\"avatar\"  v-show=\"show\" class=\"konversation-message-avatar\" v-html=\"avatar\"></span>\r\n            <span key=\"content\" v-show=\"show\" class=\"konversation-message-content\">\r\n                {{ content }}\r\n                <Attachement v-for=\"attachement, i in attachements\" :href=\"attachement.href\" :label=\"attachement.label\" :key=\"i\" />\r\n            </span>\r\n        </transition-group>\r\n    </div>\r\n</template>\r\n\r\n<script>\r\nimport Attachement from './Attachement.vue'\r\n\r\nexport default {\r\n    components: { Attachement },\r\n    props: ['type', 'content', 'avatar', 'attachements'],\r\n\r\n    data() {\r\n        return {\r\n            show: false\r\n        }\r\n    },\r\n\r\n    mounted() {\r\n        this.show = true\r\n    }\r\n}\r\n</script>\r\n\r\n<style lang=\"scss\">\r\n\r\n.konversation {\r\n    .konversation-message {\r\n        display: flex;\r\n\r\n        &.konversation-message-bot > span {\r\n            width: 100%;\r\n            display: block;\r\n            display: flex;\r\n            flex-direction: row-reverse;\r\n        }\r\n\r\n        .konversation-message-avatar {\r\n            margin: 10px 0;\r\n        }\r\n\r\n        .konversation-message-content {\r\n            display: inline-block;\r\n            border-radius: 10px;\r\n            background: #efefef;\r\n            padding: 10px;\r\n            max-width: 300px;\r\n            top: 0;\r\n            margin: 0 10px;\r\n        }\r\n    }\r\n}\r\n\r\n.fade-enter-active, .fade-leave-active {\r\n    transition: opacity .5s;\r\n}\r\n\r\n.fade-enter, .fade-leave-to {\r\n    opacity: 0;\r\n}\r\n\r\n\r\n</style>\r\n",".konversation .konversation-message {\n  display: flex; }\n  .konversation .konversation-message.konversation-message-bot > span {\n    width: 100%;\n    display: block;\n    display: flex;\n    flex-direction: row-reverse; }\n  .konversation .konversation-message .konversation-message-avatar {\n    margin: 10px 0; }\n  .konversation .konversation-message .konversation-message-content {\n    display: inline-block;\n    border-radius: 10px;\n    background: #efefef;\n    padding: 10px;\n    max-width: 300px;\n    top: 0;\n    margin: 0 10px; }\n\n.fade-enter-active, .fade-leave-active {\n  transition: opacity .5s; }\n\n.fade-enter, .fade-leave-to {\n  opacity: 0; }\n\n/*# sourceMappingURL=Message.vue.map */"]}, media: undefined });

  };
  /* scoped */
  var __vue_scope_id__$1 = undefined;
  /* module identifier */
  var __vue_module_identifier__$1 = undefined;
  /* functional template */
  var __vue_is_functional_template__$1 = false;
  /* style inject SSR */
  

  
  var Message = normalizeComponent_1(
    { render: __vue_render__$1, staticRenderFns: __vue_staticRenderFns__$1 },
    __vue_inject_styles__$1,
    __vue_script__$1,
    __vue_scope_id__$1,
    __vue_is_functional_template__$1,
    __vue_module_identifier__$1,
    browser,
    undefined
  );

//
//
//
//

var script$2 = {
    methods: {
        send: function send() {
            this.$emit('click');
        }
    }
};

/* script */
var __vue_script__$2 = script$2;

/* template */
var __vue_render__$2 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "button",
    {
      staticClass: "konversation-question-send-button",
      attrs: { type: "button" },
      on: { click: _vm.send }
    },
    [_vm._v("Send")]
  )
};
var __vue_staticRenderFns__$2 = [];
__vue_render__$2._withStripped = true;

  /* style */
  var __vue_inject_styles__$2 = function (inject) {
    if (!inject) { return }
    inject("data-v-2a53b521_0", { source: ".konversation .konversation-question .konversation-question-send-button {\n  padding: 10px;\n  background: white;\n  border: 2px solid #ddd;\n  color: #888;\n  border-radius: 5px;\n  cursor: pointer;\n}\n.konversation .konversation-question .konversation-question-send-button:focus {\n    outline: none;\n}\n\n/*# sourceMappingURL=SendButton.vue.map */", map: {"version":3,"sources":["C:\\Users\\Anis\\Desktop\\konversation\\src\\components\\SendButton.vue","SendButton.vue"],"names":[],"mappings":"AAeA;EAGA,aAAA;EACA,iBAAA;EACA,sBAAA;EACA,WAAA;EACA,kBAAA;EACA,eAAA;AAAA;AARA;IAWA,aAAA;AAAA;;AChBA,yCAAyC","file":"SendButton.vue","sourcesContent":["<template>\r\n    <button type=\"button\" class=\"konversation-question-send-button\" @click=\"send\">Send</button>\r\n</template>\r\n\r\n<script>\r\nexport default {\r\n    methods: {\r\n        send() {\r\n            this.$emit('click')\r\n        }\r\n    }\r\n}\r\n</script>\r\n\r\n<style lang=\"scss\">\r\n.konversation {\r\n    .konversation-question {\r\n        .konversation-question-send-button {\r\n            padding: 10px;\r\n            background: white;\r\n            border: 2px solid #ddd;\r\n            color: #888;\r\n            border-radius: 5px;\r\n            cursor: pointer;\r\n\r\n            &:focus {\r\n                outline: none;\r\n            }\r\n        }\r\n    }\r\n}\r\n</style>\r\n",".konversation .konversation-question .konversation-question-send-button {\n  padding: 10px;\n  background: white;\n  border: 2px solid #ddd;\n  color: #888;\n  border-radius: 5px;\n  cursor: pointer; }\n  .konversation .konversation-question .konversation-question-send-button:focus {\n    outline: none; }\n\n/*# sourceMappingURL=SendButton.vue.map */"]}, media: undefined });

  };
  /* scoped */
  var __vue_scope_id__$2 = undefined;
  /* module identifier */
  var __vue_module_identifier__$2 = undefined;
  /* functional template */
  var __vue_is_functional_template__$2 = false;
  /* style inject SSR */
  

  
  var SendButton = normalizeComponent_1(
    { render: __vue_render__$2, staticRenderFns: __vue_staticRenderFns__$2 },
    __vue_inject_styles__$2,
    __vue_script__$2,
    __vue_scope_id__$2,
    __vue_is_functional_template__$2,
    __vue_module_identifier__$2,
    browser,
    undefined
  );

//

var script$3 = {
    components: { SendButton: SendButton },
    props: ['value'],

    data: function data() {
        return {
            input: ''
        }
    },

    methods: {
        done: function done() {
            this.$emit('response', this.input);
        }
    }
};

/* script */
var __vue_script__$3 = script$3;

/* template */
var __vue_render__$3 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "div",
    { staticClass: "konversation-question-input-text" },
    [
      _c("input", {
        directives: [
          {
            name: "model",
            rawName: "v-model",
            value: _vm.input,
            expression: "input"
          }
        ],
        ref: "input",
        staticClass: "konversation-question-input-text-input",
        attrs: { type: "text" },
        domProps: { value: _vm.input },
        on: {
          keyup: function($event) {
            if (
              !$event.type.indexOf("key") &&
              _vm._k($event.keyCode, "enter", 13, $event.key, "Enter")
            ) {
              return null
            }
            return _vm.done($event)
          },
          input: function($event) {
            if ($event.target.composing) {
              return
            }
            _vm.input = $event.target.value;
          }
        }
      }),
      _vm._v(" "),
      _c("SendButton", { on: { click: _vm.done } })
    ],
    1
  )
};
var __vue_staticRenderFns__$3 = [];
__vue_render__$3._withStripped = true;

  /* style */
  var __vue_inject_styles__$3 = function (inject) {
    if (!inject) { return }
    inject("data-v-0c47fe98_0", { source: ".konversation .konversation-question .konversation-question-input-text .konversation-question-input-text-input {\n  box-sizing: border-box;\n  height: 38px;\n  border-radius: 5px;\n  border: 2px solid #ddd;\n  padding: 5px 10px;\n}\n.konversation .konversation-question .konversation-question-input-text .konversation-question-input-text-input:focus {\n    outline: none;\n}\n\n/*# sourceMappingURL=InputText.vue.map */", map: {"version":3,"sources":["C:\\Users\\Anis\\Desktop\\konversation\\src\\components\\InputText.vue","InputText.vue"],"names":[],"mappings":"AA6BA;EAIA,sBAAA;EACA,YAAA;EACA,kBAAA;EACA,sBAAA;EACA,iBAAA;AAAA;AARA;IAWA,aAAA;AAAA;;AC/BA,wCAAwC","file":"InputText.vue","sourcesContent":["<template>\r\n    <div class=\"konversation-question-input-text\">\r\n        <input type=\"text\" class=\"konversation-question-input-text-input\" v-model=\"input\" @keyup.enter=\"done\" ref=\"input\">\r\n        <SendButton @click=\"done\"/>\r\n    </div>\r\n</template>\r\n\r\n<script>\r\nimport SendButton from './SendButton.vue'\r\n\r\nexport default {\r\n    components: { SendButton },\r\n    props: ['value'],\r\n\r\n    data() {\r\n        return {\r\n            input: ''\r\n        }\r\n    },\r\n\r\n    methods: {\r\n        done() {\r\n            this.$emit('response', this.input)\r\n        }\r\n    }\r\n}\r\n</script>\r\n\r\n<style lang=\"scss\">\r\n.konversation {\r\n    .konversation-question {\r\n        .konversation-question-input-text {\r\n            .konversation-question-input-text-input {\r\n                box-sizing: border-box;\r\n                height: 38px;\r\n                border-radius: 5px;\r\n                border: 2px solid #ddd;\r\n                padding: 5px 10px;\r\n\r\n                &:focus {\r\n                    outline: none;\r\n                }\r\n            }\r\n        }\r\n    }\r\n}\r\n\r\n</style>\r\n",".konversation .konversation-question .konversation-question-input-text .konversation-question-input-text-input {\n  box-sizing: border-box;\n  height: 38px;\n  border-radius: 5px;\n  border: 2px solid #ddd;\n  padding: 5px 10px; }\n  .konversation .konversation-question .konversation-question-input-text .konversation-question-input-text-input:focus {\n    outline: none; }\n\n/*# sourceMappingURL=InputText.vue.map */"]}, media: undefined });

  };
  /* scoped */
  var __vue_scope_id__$3 = undefined;
  /* module identifier */
  var __vue_module_identifier__$3 = undefined;
  /* functional template */
  var __vue_is_functional_template__$3 = false;
  /* style inject SSR */
  

  
  var InputText = normalizeComponent_1(
    { render: __vue_render__$3, staticRenderFns: __vue_staticRenderFns__$3 },
    __vue_inject_styles__$3,
    __vue_script__$3,
    __vue_scope_id__$3,
    __vue_is_functional_template__$3,
    __vue_module_identifier__$3,
    browser,
    undefined
  );

//
//
//
//
//
//

var script$4 = {
    props: ['choices'],

    methods: {
        choose: function choose(choice) {
            this.$emit('response', choice);
        }
    }
};

/* script */
var __vue_script__$4 = script$4;

/* template */
var __vue_render__$4 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "div",
    { staticClass: "konversation-question-input-choice" },
    _vm._l(_vm.choices, function(choice) {
      return _c(
        "button",
        {
          staticClass: "konversation-question-input-choice-button",
          attrs: { type: "button", name: "button" },
          on: {
            click: function($event) {
              return _vm.choose(choice)
            }
          }
        },
        [_vm._v(_vm._s(choice.label))]
      )
    }),
    0
  )
};
var __vue_staticRenderFns__$4 = [];
__vue_render__$4._withStripped = true;

  /* style */
  var __vue_inject_styles__$4 = function (inject) {
    if (!inject) { return }
    inject("data-v-cb9fab36_0", { source: ".konversation .konversation-question .konversation-question-input-choice-button {\n  padding: 10px;\n  background: white;\n  border: 2px solid #ddd;\n  color: #888;\n  border-radius: 5px;\n  cursor: pointer;\n  margin-right: 10px;\n}\n.konversation .konversation-question .konversation-question-input-choice-button:focus {\n    outline: none;\n}\n\n/*# sourceMappingURL=InputChoice.vue.map */", map: {"version":3,"sources":["C:\\Users\\Anis\\Desktop\\konversation\\src\\components\\InputChoice.vue","InputChoice.vue"],"names":[],"mappings":"AAmBA;EAGA,aAAA;EACA,iBAAA;EACA,sBAAA;EACA,WAAA;EACA,kBAAA;EACA,eAAA;EACA,kBAAA;AAAA;AATA;IAYA,aAAA;AAAA;;ACpBA,0CAA0C","file":"InputChoice.vue","sourcesContent":["<template>\r\n    <div class=\"konversation-question-input-choice\">\r\n        <button v-for=\"choice in choices\" class=\"konversation-question-input-choice-button\" type=\"button\" name=\"button\" @click=\"choose(choice)\">{{ choice.label }}</button>\r\n    </div>\r\n</template>\r\n\r\n<script>\r\nexport default {\r\n    props: ['choices'],\r\n\r\n    methods: {\r\n        choose(choice) {\r\n            this.$emit('response', choice)\r\n        }\r\n    }\r\n}\r\n</script>\r\n\r\n<style lang=\"scss\">\r\n.konversation {\r\n    .konversation-question {\r\n        .konversation-question-input-choice-button {\r\n            padding: 10px;\r\n            background: white;\r\n            border: 2px solid #ddd;\r\n            color: #888;\r\n            border-radius: 5px;\r\n            cursor: pointer;\r\n            margin-right: 10px;\r\n\r\n            &:focus {\r\n                outline: none;\r\n            }\r\n\r\n        }\r\n    }\r\n}\r\n</style>\r\n",".konversation .konversation-question .konversation-question-input-choice-button {\n  padding: 10px;\n  background: white;\n  border: 2px solid #ddd;\n  color: #888;\n  border-radius: 5px;\n  cursor: pointer;\n  margin-right: 10px; }\n  .konversation .konversation-question .konversation-question-input-choice-button:focus {\n    outline: none; }\n\n/*# sourceMappingURL=InputChoice.vue.map */"]}, media: undefined });

  };
  /* scoped */
  var __vue_scope_id__$4 = undefined;
  /* module identifier */
  var __vue_module_identifier__$4 = undefined;
  /* functional template */
  var __vue_is_functional_template__$4 = false;
  /* style inject SSR */
  

  
  var InputChoice = normalizeComponent_1(
    { render: __vue_render__$4, staticRenderFns: __vue_staticRenderFns__$4 },
    __vue_inject_styles__$4,
    __vue_script__$4,
    __vue_scope_id__$4,
    __vue_is_functional_template__$4,
    __vue_module_identifier__$4,
    browser,
    undefined
  );

//

var script$5 = {
    props: ['api'],
    components: { SendButton: SendButton },

    data: function data() {
        return {
            uploading: false,
            progress: 0
        }
    },

    methods: {
        done: function done() {
            var this$1 = this;

            var data = new FormData();
            data.append('file', this.$refs.file.files[0]);
            this.uplaoding = true;
            return axios.post(this.api, data, {
                headers: { 'Content-Type': 'multipart/form-data' },

                // update progress
                onUploadProgress: function (e) {
    				this$1.progress = Math.round((e.loaded * 100) / e.total);
    			}
            })

            .then(function (res) { return res.data; })
            .then(function (href) {
                this$1.uploading = false;
                this$1.$emit('response', href);
            })
        }
    }
};

/* script */
var __vue_script__$5 = script$5;

/* template */
var __vue_render__$5 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "div",
    { staticClass: "konversation-question-input-file" },
    [
      _c("input", {
        ref: "file",
        attrs: { type: "file", clas: "konversation-question-input-file-input" }
      }),
      _vm._v(" "),
      _c("SendButton", { on: { click: _vm.done } }),
      _vm._v(" "),
      _vm.uploading
        ? _c(
            "span",
            { staticClass: "konversation-question-input-file-progress" },
            [_vm._v(_vm._s(_vm.progress) + "%")]
          )
        : _vm._e()
    ],
    1
  )
};
var __vue_staticRenderFns__$5 = [];
__vue_render__$5._withStripped = true;

  /* style */
  var __vue_inject_styles__$5 = function (inject) {
    if (!inject) { return }
    inject("data-v-2d66053b_0", { source: ".konversation .konversation-question .konversation-question-input-file .konversation-question-input-file-input {\n  box-sizing: border-box;\n  height: 38px;\n  border-radius: 5px;\n  border: 2px solid #ddd;\n  padding: 5px 10px;\n}\n.konversation .konversation-question .konversation-question-input-file .konversation-question-input-file-input:focus {\n    outline: none;\n}\n\n/*# sourceMappingURL=InputFile.vue.map */", map: {"version":3,"sources":["C:\\Users\\Anis\\Desktop\\konversation\\src\\components\\InputFile.vue","InputFile.vue"],"names":[],"mappings":"AAgDA;EAIA,sBAAA;EACA,YAAA;EACA,kBAAA;EACA,sBAAA;EACA,iBAAA;AAAA;AARA;IAWA,aAAA;AAAA;;AClDA,wCAAwC","file":"InputFile.vue","sourcesContent":["<template>\r\n    <div class=\"konversation-question-input-file\">\r\n        <input type=\"file\" ref=\"file\" clas=\"konversation-question-input-file-input\"/>\r\n        <SendButton @click=\"done\"/>\r\n        <span v-if=\"uploading\" class=\"konversation-question-input-file-progress\">{{ progress }}%</span>\r\n    </div>\r\n</template>\r\n\r\n<script>\r\nimport SendButton from './SendButton.vue'\r\nimport axios from 'axios'\r\n\r\nexport default {\r\n    props: ['api'],\r\n    components: { SendButton },\r\n\r\n    data() {\r\n        return {\r\n            uploading: false,\r\n            progress: 0\r\n        }\r\n    },\r\n\r\n    methods: {\r\n        done() {\r\n            let data = new FormData()\r\n            data.append('file', this.$refs.file.files[0])\r\n            this.uplaoding = true\r\n            return axios.post(this.api, data, {\r\n                headers: { 'Content-Type': 'multipart/form-data' },\r\n\r\n                // update progress\r\n                onUploadProgress: e => {\r\n    \t\t\t\tthis.progress = Math.round((e.loaded * 100) / e.total)\r\n    \t\t\t}\r\n            })\r\n\r\n            .then(res => res.data)\r\n            .then(href => {\r\n                this.uploading = false\r\n                this.$emit('response', href)\r\n            })\r\n        }\r\n    }\r\n}\r\n</script>\r\n\r\n<style lang=\"scss\">\r\n.konversation {\r\n    .konversation-question {\r\n        .konversation-question-input-file {\r\n            .konversation-question-input-file-input {\r\n                box-sizing: border-box;\r\n                height: 38px;\r\n                border-radius: 5px;\r\n                border: 2px solid #ddd;\r\n                padding: 5px 10px;\r\n\r\n                &:focus {\r\n                    outline: none;\r\n                }\r\n            }\r\n        }\r\n    }\r\n}\r\n</style>\r\n",".konversation .konversation-question .konversation-question-input-file .konversation-question-input-file-input {\n  box-sizing: border-box;\n  height: 38px;\n  border-radius: 5px;\n  border: 2px solid #ddd;\n  padding: 5px 10px; }\n  .konversation .konversation-question .konversation-question-input-file .konversation-question-input-file-input:focus {\n    outline: none; }\n\n/*# sourceMappingURL=InputFile.vue.map */"]}, media: undefined });

  };
  /* scoped */
  var __vue_scope_id__$5 = undefined;
  /* module identifier */
  var __vue_module_identifier__$5 = undefined;
  /* functional template */
  var __vue_is_functional_template__$5 = false;
  /* style inject SSR */
  

  
  var InputFile = normalizeComponent_1(
    { render: __vue_render__$5, staticRenderFns: __vue_staticRenderFns__$5 },
    __vue_inject_styles__$5,
    __vue_script__$5,
    __vue_scope_id__$5,
    __vue_is_functional_template__$5,
    __vue_module_identifier__$5,
    browser,
    undefined
  );

//

var script$6 = {
    components: { 'input-text': InputText, 'input-choice': InputChoice, 'input-file': InputFile },
    props: ['content', 'options'],

    data: function data() {
        return {
            show: false
        }
    },

    methods: {
        response: function response(answer) {
            this.$emit('response', answer);
        }
    },

    mounted: function mounted() {
        this.show = true;
    }
};

/* script */
var __vue_script__$6 = script$6;

/* template */
var __vue_render__$6 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "div",
    { staticClass: "konversation-question" },
    [
      _c(
        "transition-group",
        { attrs: { name: "fade" } },
        [
          _c(
            "label",
            {
              directives: [
                {
                  name: "show",
                  rawName: "v-show",
                  value: _vm.show,
                  expression: "show"
                }
              ],
              key: "label",
              staticClass: "konversation-question-label"
            },
            [_vm._v(_vm._s(_vm.content))]
          ),
          _vm._v(" "),
          _vm.options.type == "text"
            ? _c("input-text", {
                directives: [
                  {
                    name: "show",
                    rawName: "v-show",
                    value: _vm.show,
                    expression: "show"
                  }
                ],
                key: "input",
                on: { response: _vm.response }
              })
            : _vm._e(),
          _vm._v(" "),
          _vm.options.type == "choice"
            ? _c("input-choice", {
                directives: [
                  {
                    name: "show",
                    rawName: "v-show",
                    value: _vm.show,
                    expression: "show"
                  }
                ],
                key: "input",
                attrs: { choices: _vm.options.answers },
                on: { response: _vm.response }
              })
            : _vm._e(),
          _vm._v(" "),
          _vm.options.type == "file"
            ? _c("input-file", {
                directives: [
                  {
                    name: "show",
                    rawName: "v-show",
                    value: _vm.show,
                    expression: "show"
                  }
                ],
                key: "input",
                attrs: { api: _vm.options.api },
                on: { response: _vm.response }
              })
            : _vm._e()
        ],
        1
      )
    ],
    1
  )
};
var __vue_staticRenderFns__$6 = [];
__vue_render__$6._withStripped = true;

  /* style */
  var __vue_inject_styles__$6 = function (inject) {
    if (!inject) { return }
    inject("data-v-039232c4_0", { source: ".konversation .konversation-question .konversation-question-label {\n  display: block;\n  margin-bottom: 10px;\n}\n.fade-enter-active, .fade-leave-active {\n  transition: opacity .5s;\n}\n.fade-enter, .fade-leave-to {\n  opacity: 0;\n}\n\n/*# sourceMappingURL=Question.vue.map */", map: {"version":3,"sources":["C:\\Users\\Anis\\Desktop\\konversation\\src\\components\\Question.vue","Question.vue"],"names":[],"mappings":"AAuCA;EAGA,cAAA;EACA,mBAAA;AAAA;AAKA;EACA,uBAAA;AAAA;AAGA;EACA,UAAA;AAAA;;AC3CA,uCAAuC","file":"Question.vue","sourcesContent":["<template>\r\n    <div class=\"konversation-question\">\r\n        <transition-group name=\"fade\">\r\n            <label        key=\"label\" v-show=\"show\" class=\"konversation-question-label\">{{ content }}</label>\r\n            <input-text   key=\"input\" v-show=\"show\" v-if=\"options.type == 'text'\"   @response=\"response\"/>\r\n            <input-choice key=\"input\" v-show=\"show\" v-if=\"options.type == 'choice'\" :choices=\"options.answers\" @response=\"response\"/>\r\n            <input-file   key=\"input\" v-show=\"show\" v-if=\"options.type == 'file'\"   :api=\"options.api\" @response=\"response\"/>\r\n        </transition-group>\r\n    </div>\r\n</template>\r\n\r\n<script>\r\nimport InputText   from './InputText.vue'\r\nimport InputChoice from './InputChoice.vue'\r\nimport InputFile   from './InputFile.vue'\r\n\r\nexport default {\r\n    components: { 'input-text': InputText, 'input-choice': InputChoice, 'input-file': InputFile },\r\n    props: ['content', 'options'],\r\n\r\n    data() {\r\n        return {\r\n            show: false\r\n        }\r\n    },\r\n\r\n    methods: {\r\n        response(answer) {\r\n            this.$emit('response', answer)\r\n        }\r\n    },\r\n\r\n    mounted() {\r\n        this.show = true\r\n    }\r\n}\r\n</script>\r\n\r\n<style lang=\"scss\">\r\n.konversation {\r\n    .konversation-question {\r\n        .konversation-question-label {\r\n            display: block;\r\n            margin-bottom: 10px;\r\n        }\r\n    }\r\n}\r\n\r\n.fade-enter-active, .fade-leave-active {\r\n    transition: opacity .5s;\r\n}\r\n\r\n.fade-enter, .fade-leave-to {\r\n    opacity: 0;\r\n}\r\n</style>\r\n",".konversation .konversation-question .konversation-question-label {\n  display: block;\n  margin-bottom: 10px; }\n\n.fade-enter-active, .fade-leave-active {\n  transition: opacity .5s; }\n\n.fade-enter, .fade-leave-to {\n  opacity: 0; }\n\n/*# sourceMappingURL=Question.vue.map */"]}, media: undefined });

  };
  /* scoped */
  var __vue_scope_id__$6 = undefined;
  /* module identifier */
  var __vue_module_identifier__$6 = undefined;
  /* functional template */
  var __vue_is_functional_template__$6 = false;
  /* style inject SSR */
  

  
  var Question = normalizeComponent_1(
    { render: __vue_render__$6, staticRenderFns: __vue_staticRenderFns__$6 },
    __vue_inject_styles__$6,
    __vue_script__$6,
    __vue_scope_id__$6,
    __vue_is_functional_template__$6,
    __vue_module_identifier__$6,
    browser,
    undefined
  );

//

var script$7 = {
    components: { Message: Message, Question: Question },
    props: ['avatar', 'timeout', 'rtl'],

    name: 'konversation',
    data: function data () {
        return {
            items: [
                // {
                //     type: 'message.bot',
                //     content: 'What is your name?',
                //     avatar: '👨'
                // },
                //
                // {
                //     type: 'question',
                //     content: 'Please type your name: ',
                //     options: {
                //         type: 'text'
                //     }
                // },
                //
                // {
                //     type: 'message.user',
                //     content: 'Anis',
                //     avatar: '👨'
                // },
                //
                // {
                //     type: 'message.bot',
                //     content: 'Thank you',
                //     avatar: '👨'
                // }
            ]
        }
    },

    methods: {

        response: function response(answer) {
            this.$emit('response', answer);
        },

        wait: function wait(timeout) {
            return new Promise(function (resolve, reject) {
                setTimeout(function () { return resolve(); }, timeout);
            })
        },

        say: function say(message, attachements, avatar) {
            var this$1 = this;
            if ( avatar === void 0 ) avatar = this.avatar;

            return this.wait(this.timeout)
            .then(function () {
                this$1.items.push({
                    type: 'message.bot',
                    content: message,
                    avatar: avatar,
                    attachements: attachements
                });

                return Promise.resolve(this$1)
            })
        },

        ask: function ask(question, type, options) {
            var this$1 = this;
            if ( type === void 0 ) type = 'text';


            var opts = {
                type: type
            };

            for (var key in options) {
                opts[key] = options[key];
            }

            return this.wait(this.timeout)
            .then(function () {
                this$1.items.push({
                    type: 'question',
                    content: question,
                    options: opts
                });

                return new Promise(function (resolve, reject) {
                    this$1.$on('response', function (answer) {
                        var lastItem = this$1.items.pop();
                        if (lastItem.type != 'question') { this$1.items.push(lastItem); }
                        resolve(answer);
                    });
                })
            })
        },

        respond: function respond(message, attachements, avatar) {
            if ( avatar === void 0 ) avatar = this.avatar;

            this.items.push({
                type: 'message.user',
                content: message,
                avatar: avatar,
                attachements: attachements
            });

            return Promise.resolve(this)
        }
    }
};

/* script */
var __vue_script__$7 = script$7;

/* template */
var __vue_render__$7 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "div",
    { staticClass: "konversation", class: { rtl: _vm.rtl } },
    _vm._l(_vm.items, function(item) {
      return _c(
        "div",
        { staticClass: "konversation-item" },
        [
          item.type == "message.bot"
            ? _c("Message", {
                attrs: {
                  type: "bot",
                  content: item.content,
                  avatar: item.avatar,
                  attachements: item.attachements
                }
              })
            : _vm._e(),
          _vm._v(" "),
          item.type == "message.user"
            ? _c("Message", {
                attrs: {
                  type: "user",
                  content: item.content,
                  avatar: item.avatar,
                  attachements: item.attachements
                }
              })
            : _vm._e(),
          _vm._v(" "),
          item.type == "question"
            ? _c("Question", {
                attrs: { content: item.content, options: item.options },
                on: { response: _vm.response }
              })
            : _vm._e()
        ],
        1
      )
    }),
    0
  )
};
var __vue_staticRenderFns__$7 = [];
__vue_render__$7._withStripped = true;

  /* style */
  var __vue_inject_styles__$7 = function (inject) {
    if (!inject) { return }
    inject("data-v-4e45e443_0", { source: ".konversation {\n  font-family: monospace;\n  padding: 10px;\n}\n.konversation .konversation-item {\n    margin-bottom: 10px;\n}\n.konversation.rtl {\n    direction: rtl;\n}\n\n/*# sourceMappingURL=Konversation.vue.map */", map: {"version":3,"sources":["C:\\Users\\Anis\\Desktop\\konversation\\src\\components\\Konversation.vue","Konversation.vue"],"names":[],"mappings":"AAyHA;EACA,sBAAA;EACA,aAAA;AAAA;AAFA;IAKA,mBAAA;AAAA;AALA;IASA,cAAA;AAAA;;AC1HA,2CAA2C","file":"Konversation.vue","sourcesContent":["<template>\n    <div class=\"konversation\" :class=\"{ rtl }\">\n        <div v-for=\"item in items\" class=\"konversation-item\">\n            <Message  v-if=\"item.type == 'message.bot'\"  type=\"bot\"  :content=\"item.content\" :avatar=\"item.avatar\" :attachements=\"item.attachements\"/>\n            <Message  v-if=\"item.type == 'message.user'\" type=\"user\" :content=\"item.content\" :avatar=\"item.avatar\" :attachements=\"item.attachements\"/>\n            <Question v-if=\"item.type == 'question'\" :content=\"item.content\" :options=\"item.options\" @response=\"response\"/>\n        </div>\n    </div>\n</template>\n\n<script>\n\nimport Message from './Message.vue'\nimport Question from './Question.vue'\n\nexport default {\n    components: { Message, Question },\n    props: ['avatar', 'timeout', 'rtl'],\n\n    name: 'konversation',\n    data () {\n        return {\n            items: [\n                // {\n                //     type: 'message.bot',\n                //     content: 'What is your name?',\n                //     avatar: '👨'\n                // },\n                //\n                // {\n                //     type: 'question',\n                //     content: 'Please type your name: ',\n                //     options: {\n                //         type: 'text'\n                //     }\n                // },\n                //\n                // {\n                //     type: 'message.user',\n                //     content: 'Anis',\n                //     avatar: '👨'\n                // },\n                //\n                // {\n                //     type: 'message.bot',\n                //     content: 'Thank you',\n                //     avatar: '👨'\n                // }\n            ]\n        }\n    },\n\n    methods: {\n\n        response(answer) {\n            this.$emit('response', answer)\n        },\n\n        wait(timeout) {\n            return new Promise((resolve, reject) => {\n                setTimeout(() => resolve(), timeout)\n            })\n        },\n\n        say(message, attachements, avatar = this.avatar) {\n            return this.wait(this.timeout)\n            .then(() => {\n                this.items.push({\n                    type: 'message.bot',\n                    content: message,\n                    avatar,\n                    attachements\n                })\n\n                return Promise.resolve(this)\n            })\n        },\n\n        ask(question, type = 'text', options) {\n\n            let opts = {\n                type\n            }\n\n            for (let key in options) {\n                opts[key] = options[key]\n            }\n\n            return this.wait(this.timeout)\n            .then(() => {\n                this.items.push({\n                    type: 'question',\n                    content: question,\n                    options: opts\n                })\n\n                return new Promise((resolve, reject) => {\n                    this.$on('response', answer => {\n                        let lastItem = this.items.pop()\n                        if (lastItem.type != 'question') this.items.push(lastItem)\n                        resolve(answer)\n                    })\n                })\n            })\n        },\n\n        respond(message, attachements, avatar = this.avatar) {\n            this.items.push({\n                type: 'message.user',\n                content: message,\n                avatar,\n                attachements\n            })\n\n            return Promise.resolve(this)\n        }\n    }\n}\n</script>\n\n<style lang=\"scss\">\n    .konversation {\n        font-family: monospace;\n        padding: 10px;\n\n        .konversation-item {\n            margin-bottom: 10px;\n        }\n\n        &.rtl {\n            direction: rtl;\n        }\n    }\n</style>\n",".konversation {\n  font-family: monospace;\n  padding: 10px; }\n  .konversation .konversation-item {\n    margin-bottom: 10px; }\n  .konversation.rtl {\n    direction: rtl; }\n\n/*# sourceMappingURL=Konversation.vue.map */"]}, media: undefined });

  };
  /* scoped */
  var __vue_scope_id__$7 = undefined;
  /* module identifier */
  var __vue_module_identifier__$7 = undefined;
  /* functional template */
  var __vue_is_functional_template__$7 = false;
  /* style inject SSR */
  

  
  var Konversation = normalizeComponent_1(
    { render: __vue_render__$7, staticRenderFns: __vue_staticRenderFns__$7 },
    __vue_inject_styles__$7,
    __vue_script__$7,
    __vue_scope_id__$7,
    __vue_is_functional_template__$7,
    __vue_module_identifier__$7,
    browser,
    undefined
  );

export default Konversation;

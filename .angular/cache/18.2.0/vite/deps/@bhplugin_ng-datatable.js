import {
  CheckboxControlValueAccessor,
  DefaultValueAccessor,
  FormsModule,
  NgControlStatus,
  NgModel,
  NgSelectOption,
  NumberValueAccessor,
  SelectControlValueAccessor,
  ɵNgSelectMultipleOption
} from "./chunk-3VF27ZPB.js";
import {
  DomSanitizer
} from "./chunk-7AFCKYR5.js";
import "./chunk-GUXEIMF7.js";
import {
  CommonModule,
  NgClass,
  NgForOf,
  NgIf,
  NgTemplateOutlet
} from "./chunk-OACGOX5T.js";
import {
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  Directive,
  EventEmitter,
  Input,
  NgModule,
  Output,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
  ViewEncapsulation$1,
  setClassMetadata,
  ɵɵNgOnChangesFeature,
  ɵɵadvance,
  ɵɵattribute,
  ɵɵclassMap,
  ɵɵclassProp,
  ɵɵcontentQuery,
  ɵɵdefineComponent,
  ɵɵdefineDirective,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵelementContainer,
  ɵɵelementContainerEnd,
  ɵɵelementContainerStart,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵloadQuery,
  ɵɵnamespaceSVG,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵpropertyInterpolate,
  ɵɵpureFunction1,
  ɵɵpureFunction2,
  ɵɵpureFunction3,
  ɵɵpureFunction4,
  ɵɵqueryRefresh,
  ɵɵreference,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵsanitizeHtml,
  ɵɵstyleMap,
  ɵɵtemplate,
  ɵɵtemplateRefExtractor,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty,
  ɵɵviewQuery
} from "./chunk-SS62QQNN.js";
import "./chunk-MJFKGM26.js";
import "./chunk-4MWRP73S.js";

// node_modules/@bhplugin/ng-datatable/fesm2020/bhplugin-ng-datatable.mjs
var _c0 = (a0) => ({
  active: a0
});
function ColumnFilterComponent_ng_container_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = ɵɵgetCurrentView();
    ɵɵelementContainerStart(0);
    ɵɵelementStart(1, "button", 2);
    ɵɵlistener("click", function ColumnFilterComponent_ng_container_4_Template_button_click_1_listener() {
      ɵɵrestoreView(_r1);
      const ctx_r1 = ɵɵnextContext();
      return ɵɵresetView(ctx_r1.select("contain"));
    });
    ɵɵtext(2, "Contain");
    ɵɵelementEnd();
    ɵɵelementStart(3, "button", 2);
    ɵɵlistener("click", function ColumnFilterComponent_ng_container_4_Template_button_click_3_listener() {
      ɵɵrestoreView(_r1);
      const ctx_r1 = ɵɵnextContext();
      return ɵɵresetView(ctx_r1.select("not_contain"));
    });
    ɵɵtext(4, "Not contain");
    ɵɵelementEnd();
    ɵɵelementStart(5, "button", 2);
    ɵɵlistener("click", function ColumnFilterComponent_ng_container_4_Template_button_click_5_listener() {
      ɵɵrestoreView(_r1);
      const ctx_r1 = ɵɵnextContext();
      return ɵɵresetView(ctx_r1.select("equal"));
    });
    ɵɵtext(6, "Equal");
    ɵɵelementEnd();
    ɵɵelementStart(7, "button", 2);
    ɵɵlistener("click", function ColumnFilterComponent_ng_container_4_Template_button_click_7_listener() {
      ɵɵrestoreView(_r1);
      const ctx_r1 = ɵɵnextContext();
      return ɵɵresetView(ctx_r1.select("not_equal"));
    });
    ɵɵtext(8, "Not equal");
    ɵɵelementEnd();
    ɵɵelementStart(9, "button", 2);
    ɵɵlistener("click", function ColumnFilterComponent_ng_container_4_Template_button_click_9_listener() {
      ɵɵrestoreView(_r1);
      const ctx_r1 = ɵɵnextContext();
      return ɵɵresetView(ctx_r1.select("start_with"));
    });
    ɵɵtext(10, "Starts with");
    ɵɵelementEnd();
    ɵɵelementStart(11, "button", 2);
    ɵɵlistener("click", function ColumnFilterComponent_ng_container_4_Template_button_click_11_listener() {
      ɵɵrestoreView(_r1);
      const ctx_r1 = ɵɵnextContext();
      return ɵɵresetView(ctx_r1.select("end_with"));
    });
    ɵɵtext(12, "Ends with");
    ɵɵelementEnd();
    ɵɵelementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext();
    ɵɵadvance();
    ɵɵclassProp("active", ctx_r1.column.condition === "contain");
    ɵɵadvance(2);
    ɵɵclassProp("active", ctx_r1.column.condition === "not_contain");
    ɵɵadvance(2);
    ɵɵclassProp("active", ctx_r1.column.condition === "equal");
    ɵɵadvance(2);
    ɵɵclassProp("active", ctx_r1.column.condition === "not_equal");
    ɵɵadvance(2);
    ɵɵclassProp("active", ctx_r1.column.condition === "start_with");
    ɵɵadvance(2);
    ɵɵclassProp("active", ctx_r1.column.condition === "end_with");
  }
}
function ColumnFilterComponent_ng_container_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = ɵɵgetCurrentView();
    ɵɵelementContainerStart(0);
    ɵɵelementStart(1, "button", 2);
    ɵɵlistener("click", function ColumnFilterComponent_ng_container_5_Template_button_click_1_listener() {
      ɵɵrestoreView(_r3);
      const ctx_r1 = ɵɵnextContext();
      return ɵɵresetView(ctx_r1.select("equal"));
    });
    ɵɵtext(2, "Equal");
    ɵɵelementEnd();
    ɵɵelementStart(3, "button", 2);
    ɵɵlistener("click", function ColumnFilterComponent_ng_container_5_Template_button_click_3_listener() {
      ɵɵrestoreView(_r3);
      const ctx_r1 = ɵɵnextContext();
      return ɵɵresetView(ctx_r1.select("not_equal"));
    });
    ɵɵtext(4, "Not Equal");
    ɵɵelementEnd();
    ɵɵelementStart(5, "button", 2);
    ɵɵlistener("click", function ColumnFilterComponent_ng_container_5_Template_button_click_5_listener() {
      ɵɵrestoreView(_r3);
      const ctx_r1 = ɵɵnextContext();
      return ɵɵresetView(ctx_r1.select("greater_than"));
    });
    ɵɵtext(6, "Greater than");
    ɵɵelementEnd();
    ɵɵelementStart(7, "button", 2);
    ɵɵlistener("click", function ColumnFilterComponent_ng_container_5_Template_button_click_7_listener() {
      ɵɵrestoreView(_r3);
      const ctx_r1 = ɵɵnextContext();
      return ɵɵresetView(ctx_r1.select("greater_than_equal"));
    });
    ɵɵtext(8, "Greater than or equal");
    ɵɵelementEnd();
    ɵɵelementStart(9, "button", 2);
    ɵɵlistener("click", function ColumnFilterComponent_ng_container_5_Template_button_click_9_listener() {
      ɵɵrestoreView(_r3);
      const ctx_r1 = ɵɵnextContext();
      return ɵɵresetView(ctx_r1.select("less_than"));
    });
    ɵɵtext(10, "Less than");
    ɵɵelementEnd();
    ɵɵelementStart(11, "button", 2);
    ɵɵlistener("click", function ColumnFilterComponent_ng_container_5_Template_button_click_11_listener() {
      ɵɵrestoreView(_r3);
      const ctx_r1 = ɵɵnextContext();
      return ɵɵresetView(ctx_r1.select("less_than_equal"));
    });
    ɵɵtext(12, "Less than or equal");
    ɵɵelementEnd();
    ɵɵelementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext();
    ɵɵadvance();
    ɵɵclassProp("active", ctx_r1.column.condition === "equal");
    ɵɵadvance(2);
    ɵɵclassProp("active", ctx_r1.column.condition === "not_equal");
    ɵɵadvance(2);
    ɵɵclassProp("active", ctx_r1.column.condition === "greater_than");
    ɵɵadvance(2);
    ɵɵclassProp("active", ctx_r1.column.condition === "greater_than_equal");
    ɵɵadvance(2);
    ɵɵclassProp("active", ctx_r1.column.condition === "less_than");
    ɵɵadvance(2);
    ɵɵclassProp("active", ctx_r1.column.condition === "less_than_equal");
  }
}
function ColumnFilterComponent_ng_container_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = ɵɵgetCurrentView();
    ɵɵelementContainerStart(0);
    ɵɵelementStart(1, "button", 4);
    ɵɵlistener("click", function ColumnFilterComponent_ng_container_6_Template_button_click_1_listener() {
      ɵɵrestoreView(_r4);
      const ctx_r1 = ɵɵnextContext();
      return ɵɵresetView(ctx_r1.select("equal"));
    });
    ɵɵtext(2, "Equal");
    ɵɵelementEnd();
    ɵɵelementStart(3, "button", 4);
    ɵɵlistener("click", function ColumnFilterComponent_ng_container_6_Template_button_click_3_listener() {
      ɵɵrestoreView(_r4);
      const ctx_r1 = ɵɵnextContext();
      return ɵɵresetView(ctx_r1.select("not_equal"));
    });
    ɵɵtext(4, "Not equal");
    ɵɵelementEnd();
    ɵɵelementStart(5, "button", 4);
    ɵɵlistener("click", function ColumnFilterComponent_ng_container_6_Template_button_click_5_listener() {
      ɵɵrestoreView(_r4);
      const ctx_r1 = ɵɵnextContext();
      return ɵɵresetView(ctx_r1.select("greater_than"));
    });
    ɵɵtext(6, "Greater than");
    ɵɵelementEnd();
    ɵɵelementStart(7, "button", 4);
    ɵɵlistener("click", function ColumnFilterComponent_ng_container_6_Template_button_click_7_listener() {
      ɵɵrestoreView(_r4);
      const ctx_r1 = ɵɵnextContext();
      return ɵɵresetView(ctx_r1.select("less_than"));
    });
    ɵɵtext(8, "Less than");
    ɵɵelementEnd();
    ɵɵelementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext();
    ɵɵadvance();
    ɵɵproperty("ngClass", ɵɵpureFunction1(4, _c0, ctx_r1.column.condition === "equal"));
    ɵɵadvance(2);
    ɵɵproperty("ngClass", ɵɵpureFunction1(6, _c0, ctx_r1.column.condition === "not_equal"));
    ɵɵadvance(2);
    ɵɵproperty("ngClass", ɵɵpureFunction1(8, _c0, ctx_r1.column.condition === "greater_than"));
    ɵɵadvance(2);
    ɵɵproperty("ngClass", ɵɵpureFunction1(10, _c0, ctx_r1.column.condition === "less_than"));
  }
}
var _c1 = ["template"];
function IconCheckComponent_ng_template_0_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵnamespaceSVG();
    ɵɵelementStart(0, "svg", 1)(1, "g", 2)(2, "g", 3);
    ɵɵelement(3, "path", 4);
    ɵɵelementEnd()()();
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    ɵɵproperty("ngClass", ctx_r0.class);
  }
}
function IconDashComponent_ng_template_0_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵnamespaceSVG();
    ɵɵelementStart(0, "svg", 1);
    ɵɵelement(1, "line", 2);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    ɵɵproperty("ngClass", ctx_r0.class);
  }
}
function IconFilterComponent_ng_template_0_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵnamespaceSVG();
    ɵɵelementStart(0, "svg", 1);
    ɵɵelement(1, "polygon", 2);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    ɵɵproperty("ngClass", ctx_r0.class);
  }
}
var _c2 = ["selectedAll"];
var _c3 = (a0, a1, a2) => ({
  "bh-sticky bh-bg-blue-light bh-z-[1]": a0,
  "bh-top-0": a1,
  "bh-left-0": a2
});
var _c4 = (a0, a1, a2) => ({
  width: a0,
  "min-width": a1,
  "max-width": a2
});
var _c5 = (a0, a1, a2) => [a0, a1, a2];
var _c6 = (a0) => [a0];
var _c7 = (a0, a1) => [a0, a1];
var _c8 = (a0) => ({
  "bh-hidden": a0
});
function ColumnHeaderComponent_ng_template_0_th_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "th", 4)(1, "div", 5)(2, "input", 6, 1);
    ɵɵlistener("click", function ColumnHeaderComponent_ng_template_0_th_1_Template_input_click_2_listener($event) {
      ɵɵrestoreView(_r1);
      const selectedAll_r2 = ɵɵreference(3);
      const ctx_r2 = ɵɵnextContext(2);
      ctx_r2.selectAll.emit(selectedAll_r2.checked);
      return ɵɵresetView($event.stopPropagation());
    });
    ɵɵelementEnd();
    ɵɵelementStart(4, "div");
    ɵɵelement(5, "icon-check", 7)(6, "icon-dash", 8);
    ɵɵelementEnd()()();
  }
  if (rf & 2) {
    const ctx_r2 = ɵɵnextContext(2);
    ɵɵclassMap("bh-w-px");
    ɵɵproperty("ngClass", ɵɵpureFunction3(3, _c3, ctx_r2.all.stickyHeader || ctx_r2.all.stickyFirstColumn, ctx_r2.all.stickyHeader, ctx_r2.all.stickyFirstColumn));
  }
}
function ColumnHeaderComponent_ng_template_0_ng_container_2_th_1_span_3_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "span", 13);
    ɵɵnamespaceSVG();
    ɵɵelementStart(1, "svg", 14);
    ɵɵelement(2, "polygon", 15)(3, "polygon", 16);
    ɵɵelementEnd()();
  }
  if (rf & 2) {
    const col_r5 = ɵɵnextContext(2).$implicit;
    const ctx_r2 = ɵɵnextContext(2);
    ɵɵproperty("ngClass", ɵɵpureFunction2(3, _c7, ctx_r2.all.sortColumn, ctx_r2.all.sortDirection));
    ɵɵadvance(2);
    ɵɵproperty("ngClass", ɵɵpureFunction1(6, _c6, ctx_r2.all.sortColumn === col_r5.field && ctx_r2.all.sortDirection === "asc" ? "!bh-text-primary" : ""));
    ɵɵadvance();
    ɵɵproperty("ngClass", ɵɵpureFunction1(8, _c6, ctx_r2.all.sortColumn === col_r5.field && ctx_r2.all.sortDirection === "desc" ? "!bh-text-primary" : ""));
  }
}
function ColumnHeaderComponent_ng_template_0_ng_container_2_th_1_ng_container_4_div_1_input_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "input", 25);
    ɵɵtwoWayListener("ngModelChange", function ColumnHeaderComponent_ng_template_0_ng_container_2_th_1_ng_container_4_div_1_input_1_Template_input_ngModelChange_0_listener($event) {
      ɵɵrestoreView(_r7);
      const col_r5 = ɵɵnextContext(4).$implicit;
      ɵɵtwoWayBindingSet(col_r5.value, $event) || (col_r5.value = $event);
      return ɵɵresetView($event);
    });
    ɵɵlistener("keyup", function ColumnHeaderComponent_ng_template_0_ng_container_2_th_1_ng_container_4_div_1_input_1_Template_input_keyup_0_listener() {
      ɵɵrestoreView(_r7);
      const ctx_r2 = ɵɵnextContext(6);
      return ɵɵresetView(ctx_r2.filterChange.emit());
    });
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const col_r5 = ɵɵnextContext(4).$implicit;
    ɵɵtwoWayProperty("ngModel", col_r5.value);
  }
}
function ColumnHeaderComponent_ng_template_0_ng_container_2_th_1_ng_container_4_div_1_input_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "input", 26);
    ɵɵtwoWayListener("ngModelChange", function ColumnHeaderComponent_ng_template_0_ng_container_2_th_1_ng_container_4_div_1_input_2_Template_input_ngModelChange_0_listener($event) {
      ɵɵrestoreView(_r8);
      const col_r5 = ɵɵnextContext(4).$implicit;
      ɵɵtwoWayBindingSet(col_r5.value, $event) || (col_r5.value = $event);
      return ɵɵresetView($event);
    });
    ɵɵlistener("keyup", function ColumnHeaderComponent_ng_template_0_ng_container_2_th_1_ng_container_4_div_1_input_2_Template_input_keyup_0_listener() {
      ɵɵrestoreView(_r8);
      const ctx_r2 = ɵɵnextContext(6);
      return ɵɵresetView(ctx_r2.filterChange.emit());
    });
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const col_r5 = ɵɵnextContext(4).$implicit;
    ɵɵtwoWayProperty("ngModel", col_r5.value);
  }
}
function ColumnHeaderComponent_ng_template_0_ng_container_2_th_1_ng_container_4_div_1_input_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "input", 27);
    ɵɵtwoWayListener("ngModelChange", function ColumnHeaderComponent_ng_template_0_ng_container_2_th_1_ng_container_4_div_1_input_3_Template_input_ngModelChange_0_listener($event) {
      ɵɵrestoreView(_r9);
      const col_r5 = ɵɵnextContext(4).$implicit;
      ɵɵtwoWayBindingSet(col_r5.value, $event) || (col_r5.value = $event);
      return ɵɵresetView($event);
    });
    ɵɵlistener("change", function ColumnHeaderComponent_ng_template_0_ng_container_2_th_1_ng_container_4_div_1_input_3_Template_input_change_0_listener() {
      ɵɵrestoreView(_r9);
      const ctx_r2 = ɵɵnextContext(6);
      return ɵɵresetView(ctx_r2.filterChange.emit());
    });
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const col_r5 = ɵɵnextContext(4).$implicit;
    ɵɵtwoWayProperty("ngModel", col_r5.value);
  }
}
function ColumnHeaderComponent_ng_template_0_ng_container_2_th_1_ng_container_4_div_1_select_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "select", 28);
    ɵɵtwoWayListener("ngModelChange", function ColumnHeaderComponent_ng_template_0_ng_container_2_th_1_ng_container_4_div_1_select_4_Template_select_ngModelChange_0_listener($event) {
      ɵɵrestoreView(_r10);
      const col_r5 = ɵɵnextContext(4).$implicit;
      ɵɵtwoWayBindingSet(col_r5.value, $event) || (col_r5.value = $event);
      return ɵɵresetView($event);
    });
    ɵɵlistener("change", function ColumnHeaderComponent_ng_template_0_ng_container_2_th_1_ng_container_4_div_1_select_4_Template_select_change_0_listener() {
      ɵɵrestoreView(_r10);
      const ctx_r2 = ɵɵnextContext(6);
      return ɵɵresetView(ctx_r2.filterChange.emit());
    })("click", function ColumnHeaderComponent_ng_template_0_ng_container_2_th_1_ng_container_4_div_1_select_4_Template_select_click_0_listener() {
      ɵɵrestoreView(_r10);
      const ctx_r2 = ɵɵnextContext(6);
      return ɵɵresetView(ctx_r2.isOpenFilter = null);
    });
    ɵɵelementStart(1, "option", 29);
    ɵɵtext(2, "All");
    ɵɵelementEnd();
    ɵɵelementStart(3, "option", 29);
    ɵɵtext(4, "True");
    ɵɵelementEnd();
    ɵɵelementStart(5, "option", 29);
    ɵɵtext(6, "False");
    ɵɵelementEnd()();
  }
  if (rf & 2) {
    const col_r5 = ɵɵnextContext(4).$implicit;
    ɵɵtwoWayProperty("ngModel", col_r5.value);
    ɵɵadvance();
    ɵɵproperty("ngValue", void 0);
    ɵɵadvance(2);
    ɵɵproperty("ngValue", true);
    ɵɵadvance(2);
    ɵɵproperty("ngValue", false);
  }
}
function ColumnHeaderComponent_ng_template_0_ng_container_2_th_1_ng_container_4_div_1_button_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r11 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "button", 30);
    ɵɵlistener("click", function ColumnHeaderComponent_ng_template_0_ng_container_2_th_1_ng_container_4_div_1_button_5_Template_button_click_0_listener($event) {
      ɵɵrestoreView(_r11);
      const col_r5 = ɵɵnextContext(4).$implicit;
      const ctx_r2 = ɵɵnextContext(2);
      ctx_r2.toggleFilterMenu(col_r5);
      return ɵɵresetView($event.stopPropagation());
    });
    ɵɵelement(1, "icon-filter", 31);
    ɵɵelementEnd();
  }
}
function ColumnHeaderComponent_ng_template_0_ng_container_2_th_1_ng_container_4_div_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "div", 18);
    ɵɵtemplate(1, ColumnHeaderComponent_ng_template_0_ng_container_2_th_1_ng_container_4_div_1_input_1_Template, 1, 1, "input", 19)(2, ColumnHeaderComponent_ng_template_0_ng_container_2_th_1_ng_container_4_div_1_input_2_Template, 1, 1, "input", 20)(3, ColumnHeaderComponent_ng_template_0_ng_container_2_th_1_ng_container_4_div_1_input_3_Template, 1, 1, "input", 21)(4, ColumnHeaderComponent_ng_template_0_ng_container_2_th_1_ng_container_4_div_1_select_4_Template, 7, 4, "select", 22)(5, ColumnHeaderComponent_ng_template_0_ng_container_2_th_1_ng_container_4_div_1_button_5_Template, 2, 0, "button", 23);
    ɵɵelementStart(6, "column-filter", 24);
    ɵɵlistener("close", function ColumnHeaderComponent_ng_template_0_ng_container_2_th_1_ng_container_4_div_1_Template_column_filter_close_6_listener() {
      ɵɵrestoreView(_r6);
      const ctx_r2 = ɵɵnextContext(5);
      return ɵɵresetView(ctx_r2.toggleFilterMenu());
    })("filterChange", function ColumnHeaderComponent_ng_template_0_ng_container_2_th_1_ng_container_4_div_1_Template_column_filter_filterChange_6_listener() {
      ɵɵrestoreView(_r6);
      const ctx_r2 = ɵɵnextContext(5);
      return ɵɵresetView(ctx_r2.filterChange.emit());
    });
    ɵɵelementEnd()();
  }
  if (rf & 2) {
    const col_r5 = ɵɵnextContext(3).$implicit;
    const ctx_r2 = ɵɵnextContext(2);
    ɵɵadvance();
    ɵɵproperty("ngIf", col_r5.type === "string");
    ɵɵadvance();
    ɵɵproperty("ngIf", col_r5.type === "number");
    ɵɵadvance();
    ɵɵproperty("ngIf", col_r5.type === "date");
    ɵɵadvance();
    ɵɵproperty("ngIf", col_r5.type === "bool");
    ɵɵadvance();
    ɵɵproperty("ngIf", col_r5.type !== "bool");
    ɵɵadvance();
    ɵɵproperty("ngClass", ɵɵpureFunction1(7, _c8, ctx_r2.isOpenFilter !== col_r5.field))("column", col_r5);
  }
}
function ColumnHeaderComponent_ng_template_0_ng_container_2_th_1_ng_container_4_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainerStart(0);
    ɵɵtemplate(1, ColumnHeaderComponent_ng_template_0_ng_container_2_th_1_ng_container_4_div_1_Template, 7, 9, "div", 17);
    ɵɵelementContainerEnd();
  }
  if (rf & 2) {
    const col_r5 = ɵɵnextContext(2).$implicit;
    ɵɵadvance();
    ɵɵproperty("ngIf", col_r5.filter);
  }
}
function ColumnHeaderComponent_ng_template_0_ng_container_2_th_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "th", 4)(1, "div", 10);
    ɵɵlistener("click", function ColumnHeaderComponent_ng_template_0_ng_container_2_th_1_Template_div_click_1_listener() {
      ɵɵrestoreView(_r4);
      const col_r5 = ɵɵnextContext().$implicit;
      const ctx_r2 = ɵɵnextContext(2);
      return ɵɵresetView(ctx_r2.all.sortable && col_r5.sort && ctx_r2.sortChange.emit(col_r5.field));
    });
    ɵɵtext(2);
    ɵɵtemplate(3, ColumnHeaderComponent_ng_template_0_ng_container_2_th_1_span_3_Template, 4, 10, "span", 11);
    ɵɵelementEnd();
    ɵɵtemplate(4, ColumnHeaderComponent_ng_template_0_ng_container_2_th_1_ng_container_4_Template, 2, 1, "ng-container", 12);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r11 = ɵɵnextContext();
    const col_r5 = ctx_r11.$implicit;
    const j_r13 = ctx_r11.index;
    const ctx_r2 = ɵɵnextContext(2);
    ɵɵstyleMap(ɵɵpureFunction3(9, _c4, col_r5.width, col_r5.minWidth, col_r5.maxWidth));
    ɵɵclassMap("bh-select-none bh-z-[1]");
    ɵɵproperty("ngClass", ɵɵpureFunction3(13, _c5, ctx_r2.all.sortable && col_r5.sort ? "bh-cursor-pointer" : "", j_r13 === 0 && ctx_r2.all.stickyFirstColumn ? "bh-sticky bh-left-0 bh-bg-blue-light" : "", ctx_r2.all.hasCheckbox && j_r13 === 0 && ctx_r2.all.stickyFirstColumn ? "bh-left-[52px]" : ""));
    ɵɵadvance();
    ɵɵproperty("ngClass", ɵɵpureFunction1(17, _c6, col_r5.headerClass ? col_r5.headerClass : ""));
    ɵɵadvance();
    ɵɵtextInterpolate1(" ", col_r5.title, " ");
    ɵɵadvance();
    ɵɵproperty("ngIf", ctx_r2.all.sortable && col_r5.sort);
    ɵɵadvance();
    ɵɵproperty("ngIf", ctx_r2.all.columnFilter && !ctx_r2.isFooter);
  }
}
function ColumnHeaderComponent_ng_template_0_ng_container_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainerStart(0);
    ɵɵtemplate(1, ColumnHeaderComponent_ng_template_0_ng_container_2_th_1_Template, 5, 19, "th", 9);
    ɵɵelementContainerEnd();
  }
  if (rf & 2) {
    const col_r5 = ctx.$implicit;
    ɵɵadvance();
    ɵɵproperty("ngIf", !col_r5.hide);
  }
}
function ColumnHeaderComponent_ng_template_0_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "tr");
    ɵɵtemplate(1, ColumnHeaderComponent_ng_template_0_th_1_Template, 7, 7, "th", 2)(2, ColumnHeaderComponent_ng_template_0_ng_container_2_Template, 2, 1, "ng-container", 3);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = ɵɵnextContext();
    ɵɵadvance();
    ɵɵproperty("ngIf", ctx_r2.all.hasCheckbox);
    ɵɵadvance();
    ɵɵproperty("ngForOf", ctx_r2.all.columns);
  }
}
var _c9 = ["header1"];
var _c10 = ["header2"];
var _c11 = ["defaultTemplate"];
var _c12 = (a0) => ({
  height: a0
});
var _c13 = (a0) => ({
  "bh-min-h-[300px]": a0
});
var _c14 = (a0) => ({
  "bh-sticky bh-top-0 bh-z-10": a0
});
var _c15 = (a0) => ({
  "bh-sticky bh-left-0 bh-bg-blue-light": a0
});
var _c16 = (a0, a1, a2, a3) => [a0, a1, a2, a3];
var _c17 = (a0) => ({
  data: a0
});
var _c18 = (a0) => ({
  "bh-sticky bh-bottom-0": a0
});
function NgDataTableComponent_ng_container_7_tr_1_td_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "td", 4)(1, "div", 13);
    ɵɵlistener("click", function NgDataTableComponent_ng_container_7_tr_1_td_1_Template_div_click_1_listener($event) {
      ɵɵrestoreView(_r7);
      return ɵɵresetView($event.stopPropagation());
    });
    ɵɵelementStart(2, "input", 14);
    ɵɵtwoWayListener("ngModelChange", function NgDataTableComponent_ng_container_7_tr_1_td_1_Template_input_ngModelChange_2_listener($event) {
      ɵɵrestoreView(_r7);
      const item_r4 = ɵɵnextContext().$implicit;
      ɵɵtwoWayBindingSet(item_r4.selected, $event) || (item_r4.selected = $event);
      return ɵɵresetView($event);
    });
    ɵɵlistener("change", function NgDataTableComponent_ng_container_7_tr_1_td_1_Template_input_change_2_listener() {
      ɵɵrestoreView(_r7);
      const ctx_r5 = ɵɵnextContext(3);
      return ɵɵresetView(ctx_r5.checkboxChange());
    });
    ɵɵelementEnd();
    ɵɵelementStart(3, "div");
    ɵɵelement(4, "icon-check", 15);
    ɵɵelementEnd()()();
  }
  if (rf & 2) {
    const ctx_r7 = ɵɵnextContext();
    const item_r4 = ctx_r7.$implicit;
    const i_r5 = ctx_r7.index;
    const ctx_r5 = ɵɵnextContext(2);
    ɵɵproperty("ngClass", ɵɵpureFunction1(3, _c15, ctx_r5.stickyFirstColumn));
    ɵɵadvance(2);
    ɵɵpropertyInterpolate("value", item_r4[ctx_r5.uniqueKey] ? item_r4[ctx_r5.uniqueKey] : i_r5);
    ɵɵtwoWayProperty("ngModel", item_r4.selected);
  }
}
function NgDataTableComponent_ng_container_7_tr_1_ng_container_2_td_1_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainerStart(0);
    ɵɵelementContainer(1, 17);
    ɵɵelementContainerEnd();
  }
  if (rf & 2) {
    const col_r9 = ɵɵnextContext(2).$implicit;
    const item_r4 = ɵɵnextContext().$implicit;
    const ctx_r5 = ɵɵnextContext(2);
    ɵɵadvance();
    ɵɵproperty("ngTemplateOutlet", ctx_r5.getSlot(col_r9.field))("ngTemplateOutletContext", ɵɵpureFunction1(2, _c17, item_r4));
  }
}
function NgDataTableComponent_ng_container_7_tr_1_ng_container_2_td_1_div_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelement(0, "div", 18);
  }
  if (rf & 2) {
    const col_r9 = ɵɵnextContext(2).$implicit;
    const item_r4 = ɵɵnextContext().$implicit;
    const ctx_r5 = ɵɵnextContext(2);
    ɵɵproperty("innerHTML", ctx_r5.sanitizeHtml(col_r9.cellRenderer(item_r4)), ɵɵsanitizeHtml);
  }
}
function NgDataTableComponent_ng_container_7_tr_1_ng_container_2_td_1_ng_container_3_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainerStart(0);
    ɵɵtext(1);
    ɵɵelementContainerEnd();
  }
  if (rf & 2) {
    const col_r9 = ɵɵnextContext(2).$implicit;
    const item_r4 = ɵɵnextContext().$implicit;
    const ctx_r5 = ɵɵnextContext(2);
    ɵɵadvance();
    ɵɵtextInterpolate1(" ", ctx_r5.cellValue(item_r4, col_r9.field), " ");
  }
}
function NgDataTableComponent_ng_container_7_tr_1_ng_container_2_td_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "td", 4);
    ɵɵtemplate(1, NgDataTableComponent_ng_container_7_tr_1_ng_container_2_td_1_ng_container_1_Template, 2, 4, "ng-container", 6)(2, NgDataTableComponent_ng_container_7_tr_1_ng_container_2_td_1_div_2_Template, 1, 1, "div", 16)(3, NgDataTableComponent_ng_container_7_tr_1_ng_container_2_td_1_ng_container_3_Template, 2, 1, "ng-container", 6);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r9 = ɵɵnextContext();
    const col_r9 = ctx_r9.$implicit;
    const j_r11 = ctx_r9.index;
    const item_r4 = ɵɵnextContext().$implicit;
    const ctx_r5 = ɵɵnextContext(2);
    ɵɵproperty("ngClass", ɵɵpureFunction4(4, _c16, ctx_r5.isFunction(ctx_r5.cellClass) ? ctx_r5.cellClass(item_r4) : ctx_r5.cellClass, j_r11 === 0 && ctx_r5.stickyFirstColumn ? "bh-sticky bh-left-0 bh-bg-blue-light" : "", ctx_r5.hasCheckbox && j_r11 === 0 && ctx_r5.stickyFirstColumn ? "bh-left-[52px]" : "", col_r9.cellClass ? col_r9.cellClass : ""));
    ɵɵadvance();
    ɵɵproperty("ngIf", ctx_r5.hasSlot(col_r9.field));
    ɵɵadvance();
    ɵɵproperty("ngIf", !ctx_r5.hasSlot(col_r9.field) && col_r9.cellRenderer);
    ɵɵadvance();
    ɵɵproperty("ngIf", !ctx_r5.hasSlot(col_r9.field) && !col_r9.cellRenderer);
  }
}
function NgDataTableComponent_ng_container_7_tr_1_ng_container_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainerStart(0);
    ɵɵtemplate(1, NgDataTableComponent_ng_container_7_tr_1_ng_container_2_td_1_Template, 4, 9, "td", 7);
    ɵɵelementContainerEnd();
  }
  if (rf & 2) {
    const col_r9 = ctx.$implicit;
    ɵɵadvance();
    ɵɵproperty("ngIf", !col_r9.hide);
  }
}
function NgDataTableComponent_ng_container_7_tr_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "tr", 11);
    ɵɵlistener("click", function NgDataTableComponent_ng_container_7_tr_1_Template_tr_click_0_listener() {
      const ctx_r2 = ɵɵrestoreView(_r2);
      const item_r4 = ctx_r2.$implicit;
      const i_r5 = ctx_r2.index;
      const ctx_r5 = ɵɵnextContext(2);
      return ɵɵresetView(ctx_r5.onRowClick(item_r4, i_r5));
    })("dblclick", function NgDataTableComponent_ng_container_7_tr_1_Template_tr_dblclick_0_listener() {
      const item_r4 = ɵɵrestoreView(_r2).$implicit;
      const ctx_r5 = ɵɵnextContext(2);
      return ɵɵresetView(ctx_r5.onRowDoubleClick(item_r4));
    });
    ɵɵtemplate(1, NgDataTableComponent_ng_container_7_tr_1_td_1_Template, 5, 5, "td", 7)(2, NgDataTableComponent_ng_container_7_tr_1_ng_container_2_Template, 2, 1, "ng-container", 12);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const item_r4 = ctx.$implicit;
    const ctx_r5 = ɵɵnextContext(2);
    ɵɵproperty("ngClass", ɵɵpureFunction2(3, _c7, ctx_r5.isFunction(ctx_r5.rowClass) ? ctx_r5.rowClass(item_r4) : ctx_r5.rowClass, ctx_r5.selectRowOnClick ? "bh-cursor-pointer" : ""));
    ɵɵadvance();
    ɵɵproperty("ngIf", ctx_r5.hasCheckbox);
    ɵɵadvance();
    ɵɵproperty("ngForOf", ctx_r5.columns);
  }
}
function NgDataTableComponent_ng_container_7_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainerStart(0);
    ɵɵtemplate(1, NgDataTableComponent_ng_container_7_tr_1_Template, 3, 6, "tr", 10);
    ɵɵelementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r5 = ɵɵnextContext();
    ɵɵadvance();
    ɵɵproperty("ngForOf", ctx_r5.filterItems)("ngForTrackBy", ctx_r5.trackFilterItems.bind(ctx_r5));
  }
}
function NgDataTableComponent_tr_8_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "tr")(1, "td");
    ɵɵtext(2);
    ɵɵelementEnd()();
  }
  if (rf & 2) {
    const ctx_r5 = ɵɵnextContext();
    ɵɵadvance();
    ɵɵattribute("colspan", ctx_r5.columns.length + 1);
    ɵɵadvance();
    ɵɵtextInterpolate(ctx_r5.noDataContent);
  }
}
function NgDataTableComponent_ng_container_9_tr_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "tr", 20)(1, "td", 21);
    ɵɵelement(2, "div", 22);
    ɵɵelementEnd()();
  }
  if (rf & 2) {
    const ctx_r5 = ɵɵnextContext(2);
    ɵɵadvance();
    ɵɵattribute("colspan", ctx_r5.columns.length + 1);
  }
}
function NgDataTableComponent_ng_container_9_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainerStart(0);
    ɵɵtemplate(1, NgDataTableComponent_ng_container_9_tr_1_Template, 3, 1, "tr", 19);
    ɵɵelementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r5 = ɵɵnextContext();
    ɵɵadvance();
    ɵɵproperty("ngForOf", ctx_r5.getRange(ctx_r5.pageSize));
  }
}
function NgDataTableComponent_tfoot_10_Template(rf, ctx) {
  if (rf & 1) {
    const _r12 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "tfoot", 4)(1, "column-header", 23, 1);
    ɵɵlistener("selectAll", function NgDataTableComponent_tfoot_10_Template_column_header_selectAll_1_listener($event) {
      ɵɵrestoreView(_r12);
      const ctx_r5 = ɵɵnextContext();
      return ɵɵresetView(ctx_r5.selectAll($event));
    })("sortChange", function NgDataTableComponent_tfoot_10_Template_column_header_sortChange_1_listener($event) {
      ɵɵrestoreView(_r12);
      const ctx_r5 = ɵɵnextContext();
      return ɵɵresetView(ctx_r5.sortChangeMethod($event));
    })("filterChange", function NgDataTableComponent_tfoot_10_Template_column_header_filterChange_1_listener() {
      ɵɵrestoreView(_r12);
      const ctx_r5 = ɵɵnextContext();
      return ɵɵresetView(ctx_r5.filterChangeMethod());
    });
    ɵɵelementEnd()();
  }
  if (rf & 2) {
    const ctx_r5 = ɵɵnextContext();
    ɵɵproperty("ngClass", ɵɵpureFunction1(4, _c18, ctx_r5.stickyHeader));
    ɵɵadvance();
    ɵɵproperty("all", ctx_r5.getProps)("isFooter", true)("checkAll", ctx_r5.selectedAll);
  }
}
function NgDataTableComponent_div_11_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "div", 24);
    ɵɵelement(1, "icon-loader");
    ɵɵelementEnd();
  }
}
function NgDataTableComponent_div_12_select_5_option_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "option", 38);
    ɵɵtext(1);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const option_r15 = ctx.$implicit;
    ɵɵproperty("value", option_r15);
    ɵɵadvance();
    ɵɵtextInterpolate(option_r15);
  }
}
function NgDataTableComponent_div_12_select_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r14 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "select", 36);
    ɵɵtwoWayListener("ngModelChange", function NgDataTableComponent_div_12_select_5_Template_select_ngModelChange_0_listener($event) {
      ɵɵrestoreView(_r14);
      const ctx_r5 = ɵɵnextContext(2);
      ɵɵtwoWayBindingSet(ctx_r5.currentPageSize, $event) || (ctx_r5.currentPageSize = $event);
      return ɵɵresetView($event);
    });
    ɵɵlistener("ngModelChange", function NgDataTableComponent_div_12_select_5_Template_select_ngModelChange_0_listener() {
      ɵɵrestoreView(_r14);
      const ctx_r5 = ɵɵnextContext(2);
      return ɵɵresetView(ctx_r5.changePageSize());
    });
    ɵɵtemplate(1, NgDataTableComponent_div_12_select_5_option_1_Template, 2, 2, "option", 37);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r5 = ɵɵnextContext(2);
    ɵɵtwoWayProperty("ngModel", ctx_r5.currentPageSize);
    ɵɵadvance();
    ɵɵproperty("ngForOf", ctx_r5.pageSizeOptions);
  }
}
function NgDataTableComponent_div_12_button_7_span_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelement(0, "span", 18);
  }
  if (rf & 2) {
    const ctx_r5 = ɵɵnextContext(3);
    ɵɵproperty("innerHTML", ctx_r5.sanitizeHtml(ctx_r5.firstArrow), ɵɵsanitizeHtml);
  }
}
function NgDataTableComponent_div_12_button_7__svg_svg_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵnamespaceSVG();
    ɵɵelementStart(0, "svg", 40)(1, "g", 41);
    ɵɵelement(2, "path", 42)(3, "path", 43);
    ɵɵelementEnd()();
  }
}
function NgDataTableComponent_div_12_button_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r16 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "button", 39);
    ɵɵlistener("click", function NgDataTableComponent_div_12_button_7_Template_button_click_0_listener() {
      ɵɵrestoreView(_r16);
      const ctx_r5 = ɵɵnextContext(2);
      return ɵɵresetView(ctx_r5.movePage(1));
    });
    ɵɵtemplate(1, NgDataTableComponent_div_12_button_7_span_1_Template, 1, 1, "span", 16)(2, NgDataTableComponent_div_12_button_7__svg_svg_2_Template, 4, 0, "svg", 33);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r5 = ɵɵnextContext(2);
    ɵɵclassProp("disabled", ctx_r5.currentPage <= 1);
    ɵɵadvance();
    ɵɵproperty("ngIf", ctx_r5.firstArrow);
    ɵɵadvance();
    ɵɵproperty("ngIf", !ctx_r5.firstArrow);
  }
}
function NgDataTableComponent_div_12_span_9_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelement(0, "span", 18);
  }
  if (rf & 2) {
    const ctx_r5 = ɵɵnextContext(2);
    ɵɵproperty("innerHTML", ctx_r5.sanitizeHtml(ctx_r5.previousArrow), ɵɵsanitizeHtml);
  }
}
function NgDataTableComponent_div_12__svg_svg_10_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵnamespaceSVG();
    ɵɵelementStart(0, "svg", 40);
    ɵɵelement(1, "path", 44);
    ɵɵelementEnd();
  }
}
function NgDataTableComponent_div_12_ng_container_11_button_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r17 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "button", 46);
    ɵɵlistener("click", function NgDataTableComponent_div_12_ng_container_11_button_1_Template_button_click_0_listener() {
      const page_r18 = ɵɵrestoreView(_r17).$implicit;
      const ctx_r5 = ɵɵnextContext(3);
      return ɵɵresetView(ctx_r5.movePage(page_r18));
    });
    ɵɵtext(1);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const page_r18 = ctx.$implicit;
    const ctx_r5 = ɵɵnextContext(3);
    ɵɵclassProp("disabled", ctx_r5.currentPage === page_r18)("bh-active", page_r18 === ctx_r5.currentPage);
    ɵɵadvance();
    ɵɵtextInterpolate1(" ", page_r18, " ");
  }
}
function NgDataTableComponent_div_12_ng_container_11_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainerStart(0);
    ɵɵtemplate(1, NgDataTableComponent_div_12_ng_container_11_button_1_Template, 2, 5, "button", 45);
    ɵɵelementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r5 = ɵɵnextContext(2);
    ɵɵadvance();
    ɵɵproperty("ngForOf", ctx_r5.pager.pages);
  }
}
function NgDataTableComponent_div_12_span_13_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelement(0, "span", 18);
  }
  if (rf & 2) {
    const ctx_r5 = ɵɵnextContext(2);
    ɵɵproperty("innerHTML", ctx_r5.sanitizeHtml(ctx_r5.nextArrow), ɵɵsanitizeHtml);
  }
}
function NgDataTableComponent_div_12__svg_svg_14_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵnamespaceSVG();
    ɵɵelementStart(0, "svg", 40);
    ɵɵelement(1, "path", 47);
    ɵɵelementEnd();
  }
}
function NgDataTableComponent_div_12_button_15_span_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelement(0, "span", 18);
  }
  if (rf & 2) {
    const ctx_r5 = ɵɵnextContext(3);
    ɵɵproperty("innerHTML", ctx_r5.sanitizeHtml(ctx_r5.lastArrow), ɵɵsanitizeHtml);
  }
}
function NgDataTableComponent_div_12_button_15__svg_svg_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵnamespaceSVG();
    ɵɵelementStart(0, "svg", 40)(1, "g", 41);
    ɵɵelement(2, "path", 49)(3, "path", 50);
    ɵɵelementEnd()();
  }
}
function NgDataTableComponent_div_12_button_15_Template(rf, ctx) {
  if (rf & 1) {
    const _r19 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "button", 48);
    ɵɵlistener("click", function NgDataTableComponent_div_12_button_15_Template_button_click_0_listener() {
      ɵɵrestoreView(_r19);
      const ctx_r5 = ɵɵnextContext(2);
      return ɵɵresetView(ctx_r5.movePage(ctx_r5.maxPage()));
    });
    ɵɵtemplate(1, NgDataTableComponent_div_12_button_15_span_1_Template, 1, 1, "span", 16)(2, NgDataTableComponent_div_12_button_15__svg_svg_2_Template, 4, 0, "svg", 33);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r5 = ɵɵnextContext(2);
    ɵɵclassProp("disabled", ctx_r5.currentPage >= ctx_r5.maxPage());
    ɵɵadvance();
    ɵɵproperty("ngIf", ctx_r5.lastArrow);
    ɵɵadvance();
    ɵɵproperty("ngIf", !ctx_r5.lastArrow);
  }
}
function NgDataTableComponent_div_12_Template(rf, ctx) {
  if (rf & 1) {
    const _r13 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "div", 25)(1, "div", 26)(2, "div", 27)(3, "span", 28);
    ɵɵtext(4);
    ɵɵelementEnd();
    ɵɵtemplate(5, NgDataTableComponent_div_12_select_5_Template, 2, 2, "select", 29);
    ɵɵelementEnd();
    ɵɵelementStart(6, "div", 30);
    ɵɵtemplate(7, NgDataTableComponent_div_12_button_7_Template, 3, 4, "button", 31);
    ɵɵelementStart(8, "button", 32);
    ɵɵlistener("click", function NgDataTableComponent_div_12_Template_button_click_8_listener() {
      ɵɵrestoreView(_r13);
      const ctx_r5 = ɵɵnextContext();
      return ɵɵresetView(ctx_r5.movePage(ctx_r5.currentPage - 1));
    });
    ɵɵtemplate(9, NgDataTableComponent_div_12_span_9_Template, 1, 1, "span", 16)(10, NgDataTableComponent_div_12__svg_svg_10_Template, 2, 0, "svg", 33);
    ɵɵelementEnd();
    ɵɵtemplate(11, NgDataTableComponent_div_12_ng_container_11_Template, 2, 1, "ng-container", 6);
    ɵɵelementStart(12, "button", 34);
    ɵɵlistener("click", function NgDataTableComponent_div_12_Template_button_click_12_listener() {
      ɵɵrestoreView(_r13);
      const ctx_r5 = ɵɵnextContext();
      return ɵɵresetView(ctx_r5.movePage(ctx_r5.currentPage + 1));
    });
    ɵɵtemplate(13, NgDataTableComponent_div_12_span_13_Template, 1, 1, "span", 16)(14, NgDataTableComponent_div_12__svg_svg_14_Template, 2, 0, "svg", 33);
    ɵɵelementEnd();
    ɵɵtemplate(15, NgDataTableComponent_div_12_button_15_Template, 3, 4, "button", 35);
    ɵɵelementEnd()()();
  }
  if (rf & 2) {
    const ctx_r5 = ɵɵnextContext();
    ɵɵadvance(4);
    ɵɵtextInterpolate1(" ", ctx_r5.pager.stringFormat, " ");
    ɵɵadvance();
    ɵɵproperty("ngIf", ctx_r5.showPageSize);
    ɵɵadvance(2);
    ɵɵproperty("ngIf", ctx_r5.showFirstPage);
    ɵɵadvance();
    ɵɵclassProp("disabled", ctx_r5.currentPage <= 1);
    ɵɵadvance();
    ɵɵproperty("ngIf", ctx_r5.previousArrow);
    ɵɵadvance();
    ɵɵproperty("ngIf", !ctx_r5.previousArrow);
    ɵɵadvance();
    ɵɵproperty("ngIf", ctx_r5.showNumbers);
    ɵɵadvance();
    ɵɵclassProp("disabled", ctx_r5.currentPage >= ctx_r5.maxPage());
    ɵɵadvance();
    ɵɵproperty("ngIf", ctx_r5.nextArrow);
    ɵɵadvance();
    ɵɵproperty("ngIf", !ctx_r5.nextArrow);
    ɵɵadvance();
    ɵɵproperty("ngIf", ctx_r5.showLastPage);
  }
}
var colDef = class {
};
var Pager = class {
};
var SlotDirective = class {
  constructor(templateRef) {
    this.templateRef = templateRef;
  }
};
SlotDirective.ɵfac = function SlotDirective_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || SlotDirective)(ɵɵdirectiveInject(TemplateRef));
};
SlotDirective.ɵdir = ɵɵdefineDirective({
  type: SlotDirective,
  selectors: [["", "slot", ""]],
  inputs: {
    fieldName: [0, "slot", "fieldName"],
    value: [0, "slotValue", "value"]
  }
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(SlotDirective, [{
    type: Directive,
    args: [{
      selector: "[slot]"
    }]
  }], function() {
    return [{
      type: TemplateRef
    }];
  }, {
    fieldName: [{
      type: Input,
      args: ["slot"]
    }],
    value: [{
      type: Input,
      args: ["slotValue"]
    }]
  });
})();
var ColumnFilterComponent = class {
  constructor() {
    this.close = new EventEmitter();
    this.filterChange = new EventEmitter();
  }
  ngOnInit() {
    document.addEventListener("click", this.closeMethod.bind(this));
  }
  ngOnDestroy() {
    document.removeEventListener("click", this.closeMethod.bind(this));
  }
  closeMethod() {
    this.close.emit();
  }
  select(condition) {
    this.column.condition = condition;
    if (condition === "") {
      this.column.value = "";
    }
    this.filterChange.emit(this.column);
  }
};
ColumnFilterComponent.ɵfac = function ColumnFilterComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || ColumnFilterComponent)();
};
ColumnFilterComponent.ɵcmp = ɵɵdefineComponent({
  type: ColumnFilterComponent,
  selectors: [["column-filter"]],
  inputs: {
    column: "column"
  },
  outputs: {
    close: "close",
    filterChange: "filterChange"
  },
  decls: 11,
  vars: 11,
  consts: [[1, "bh-filter-menu", "bh-absolute", "bh-z-[1]", "bh-bg-white", "bh-shadow-md", "bh-rounded-md", "bh-top-full", "bh-right-0", "bh-w-32", "bh-mt-1"], [1, "bh-text-[13px]", "bh-font-normal", "bh-rounded", "bh-overflow-hidden", 3, "click"], ["type", "button", 3, "click"], [4, "ngIf"], ["type", "button", 3, "click", "ngClass"]],
  template: function ColumnFilterComponent_Template(rf, ctx) {
    if (rf & 1) {
      ɵɵelementStart(0, "div", 0)(1, "div", 1);
      ɵɵlistener("click", function ColumnFilterComponent_Template_div_click_1_listener($event) {
        ctx.closeMethod();
        return $event.stopPropagation();
      });
      ɵɵelementStart(2, "button", 2);
      ɵɵlistener("click", function ColumnFilterComponent_Template_button_click_2_listener() {
        return ctx.select("");
      });
      ɵɵtext(3, "No filter");
      ɵɵelementEnd();
      ɵɵtemplate(4, ColumnFilterComponent_ng_container_4_Template, 13, 12, "ng-container", 3)(5, ColumnFilterComponent_ng_container_5_Template, 13, 12, "ng-container", 3)(6, ColumnFilterComponent_ng_container_6_Template, 9, 12, "ng-container", 3);
      ɵɵelementStart(7, "button", 4);
      ɵɵlistener("click", function ColumnFilterComponent_Template_button_click_7_listener() {
        return ctx.select("is_null");
      });
      ɵɵtext(8, "Is null");
      ɵɵelementEnd();
      ɵɵelementStart(9, "button", 4);
      ɵɵlistener("click", function ColumnFilterComponent_Template_button_click_9_listener() {
        return ctx.select("is_not_null");
      });
      ɵɵtext(10, "Not null");
      ɵɵelementEnd()()();
    }
    if (rf & 2) {
      ɵɵadvance(2);
      ɵɵclassProp("active", ctx.column.condition === "");
      ɵɵadvance(2);
      ɵɵproperty("ngIf", ctx.column.type === "string");
      ɵɵadvance();
      ɵɵproperty("ngIf", ctx.column.type === "number");
      ɵɵadvance();
      ɵɵproperty("ngIf", ctx.column.type === "date");
      ɵɵadvance();
      ɵɵproperty("ngClass", ɵɵpureFunction1(7, _c0, ctx.column.condition === "is_null"));
      ɵɵadvance(2);
      ɵɵproperty("ngClass", ɵɵpureFunction1(9, _c0, ctx.column.condition === "is_not_null"));
    }
  },
  dependencies: [NgClass, NgIf],
  encapsulation: 2
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ColumnFilterComponent, [{
    type: Component,
    args: [{
      selector: "column-filter",
      template: `
        <div class="bh-filter-menu bh-absolute bh-z-[1] bh-bg-white bh-shadow-md bh-rounded-md bh-top-full bh-right-0 bh-w-32 bh-mt-1">
            <div class="bh-text-[13px] bh-font-normal bh-rounded bh-overflow-hidden" (click)="closeMethod(); $event.stopPropagation()">
                <button type="button" [class.active]="column.condition === ''" (click)="select('')">No filter</button>
                <ng-container *ngIf="column.type === 'string'">
                    <button type="button" [class.active]="column.condition === 'contain'" (click)="select('contain')">Contain</button>
                    <button type="button" [class.active]="column.condition === 'not_contain'" (click)="select('not_contain')">Not contain</button>
                    <button type="button" [class.active]="column.condition === 'equal'" (click)="select('equal')">Equal</button>
                    <button type="button" [class.active]="column.condition === 'not_equal'" (click)="select('not_equal')">Not equal</button>
                    <button type="button" [class.active]="column.condition === 'start_with'" (click)="select('start_with')">Starts with</button>
                    <button type="button" [class.active]="column.condition === 'end_with'" (click)="select('end_with')">Ends with</button>
                </ng-container>
                <ng-container *ngIf="column.type === 'number'">
                    <button type="button" [class.active]="column.condition === 'equal'" (click)="select('equal')">Equal</button>
                    <button type="button" [class.active]="column.condition === 'not_equal'" (click)="select('not_equal')">Not Equal</button>
                    <button type="button" [class.active]="column.condition === 'greater_than'" (click)="select('greater_than')">Greater than</button>
                    <button type="button" [class.active]="column.condition === 'greater_than_equal'" (click)="select('greater_than_equal')">Greater than or equal</button>
                    <button type="button" [class.active]="column.condition === 'less_than'" (click)="select('less_than')">Less than</button>
                    <button type="button" [class.active]="column.condition === 'less_than_equal'" (click)="select('less_than_equal')">Less than or equal</button>
                </ng-container>
                <ng-container *ngIf="column.type === 'date'">
                    <button type="button" [ngClass]="{ active: column.condition === 'equal' }" (click)="select('equal')">Equal</button>
                    <button type="button" [ngClass]="{ active: column.condition === 'not_equal' }" (click)="select('not_equal')">Not equal</button>
                    <button type="button" [ngClass]="{ active: column.condition === 'greater_than' }" (click)="select('greater_than')">Greater than</button>
                    <button type="button" [ngClass]="{ active: column.condition === 'less_than' }" (click)="select('less_than')">Less than</button>
                </ng-container>

                <button type="button" [ngClass]="{ active: column.condition === 'is_null' }" (click)="select('is_null')">Is null</button>
                <button type="button" [ngClass]="{ active: column.condition === 'is_not_null' }" (click)="select('is_not_null')">Not null</button>
            </div>
        </div>
    `
    }]
  }], function() {
    return [];
  }, {
    column: [{
      type: Input
    }],
    close: [{
      type: Output,
      args: ["close"]
    }],
    filterChange: [{
      type: Output,
      args: ["filterChange"]
    }]
  });
})();
var IconCheckComponent = class {
  constructor(viewContainerRef) {
    this.viewContainerRef = viewContainerRef;
  }
  ngOnInit() {
    this.viewContainerRef.createEmbeddedView(this.template);
  }
};
IconCheckComponent.ɵfac = function IconCheckComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || IconCheckComponent)(ɵɵdirectiveInject(ViewContainerRef));
};
IconCheckComponent.ɵcmp = ɵɵdefineComponent({
  type: IconCheckComponent,
  selectors: [["icon-check"]],
  viewQuery: function IconCheckComponent_Query(rf, ctx) {
    if (rf & 1) {
      ɵɵviewQuery(_c1, 7);
    }
    if (rf & 2) {
      let _t;
      ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.template = _t.first);
    }
  },
  inputs: {
    class: "class"
  },
  decls: 2,
  vars: 0,
  consts: [["template", ""], ["version", "1.1", "viewBox", "0 0 17 12", 3, "ngClass"], ["fill", "none", "fill-rule", "evenodd"], ["transform", "translate(-9 -11)", "fill", "currentColor", "fill-rule", "nonzero"], ["d", "m25.576 11.414c0.56558 0.55188 0.56558 1.4439 0 1.9961l-9.404 9.176c-0.28213 0.27529-0.65247 0.41385-1.0228 0.41385-0.37034 0-0.74068-0.13855-1.0228-0.41385l-4.7019-4.588c-0.56584-0.55188-0.56584-1.4442 0-1.9961 0.56558-0.55214 1.4798-0.55214 2.0456 0l3.679 3.5899 8.3812-8.1779c0.56558-0.55214 1.4798-0.55214 2.0456 0z"]],
  template: function IconCheckComponent_Template(rf, ctx) {
    if (rf & 1) {
      ɵɵtemplate(0, IconCheckComponent_ng_template_0_Template, 4, 1, "ng-template", null, 0, ɵɵtemplateRefExtractor);
    }
  },
  dependencies: [NgClass],
  encapsulation: 2
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(IconCheckComponent, [{
    type: Component,
    args: [{
      selector: "icon-check",
      template: `
        <ng-template #template>
            <svg [ngClass]="class" version="1.1" viewBox="0 0 17 12">
                <g fill="none" fill-rule="evenodd">
                    <g transform="translate(-9 -11)" fill="currentColor" fill-rule="nonzero">
                        <path
                            d="m25.576 11.414c0.56558 0.55188 0.56558 1.4439 0 1.9961l-9.404 9.176c-0.28213 0.27529-0.65247 0.41385-1.0228 0.41385-0.37034 0-0.74068-0.13855-1.0228-0.41385l-4.7019-4.588c-0.56584-0.55188-0.56584-1.4442 0-1.9961 0.56558-0.55214 1.4798-0.55214 2.0456 0l3.679 3.5899 8.3812-8.1779c0.56558-0.55214 1.4798-0.55214 2.0456 0z"
                        />
                    </g>
                </g>
            </svg>
        </ng-template>
    `
    }]
  }], function() {
    return [{
      type: ViewContainerRef
    }];
  }, {
    template: [{
      type: ViewChild,
      args: ["template", {
        static: true
      }]
    }],
    class: [{
      type: Input
    }]
  });
})();
var IconDashComponent = class {
  constructor(viewContainerRef) {
    this.viewContainerRef = viewContainerRef;
  }
  ngOnInit() {
    this.viewContainerRef.createEmbeddedView(this.template);
  }
};
IconDashComponent.ɵfac = function IconDashComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || IconDashComponent)(ɵɵdirectiveInject(ViewContainerRef));
};
IconDashComponent.ɵcmp = ɵɵdefineComponent({
  type: IconDashComponent,
  selectors: [["icon-dash"]],
  viewQuery: function IconDashComponent_Query(rf, ctx) {
    if (rf & 1) {
      ɵɵviewQuery(_c1, 7);
    }
    if (rf & 2) {
      let _t;
      ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.template = _t.first);
    }
  },
  inputs: {
    class: "class"
  },
  decls: 2,
  vars: 0,
  consts: [["template", ""], ["viewBox", "0 0 24 24", "width", "24", "height", "24", "stroke", "currentColor", "stroke-width", "3", "fill", "none", "stroke-linecap", "round", "stroke-linejoin", "round", 3, "ngClass"], ["x1", "5", "y1", "12", "x2", "19", "y2", "12"]],
  template: function IconDashComponent_Template(rf, ctx) {
    if (rf & 1) {
      ɵɵtemplate(0, IconDashComponent_ng_template_0_Template, 2, 1, "ng-template", null, 0, ɵɵtemplateRefExtractor);
    }
  },
  dependencies: [NgClass],
  encapsulation: 2
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(IconDashComponent, [{
    type: Component,
    args: [{
      selector: "icon-dash",
      template: `
        <ng-template #template>
            <svg [ngClass]="class" viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
        </ng-template>
    `
    }]
  }], function() {
    return [{
      type: ViewContainerRef
    }];
  }, {
    template: [{
      type: ViewChild,
      args: ["template", {
        static: true
      }]
    }],
    class: [{
      type: Input
    }]
  });
})();
var IconFilterComponent = class {
  constructor(viewContainerRef) {
    this.viewContainerRef = viewContainerRef;
  }
  ngOnInit() {
    this.viewContainerRef.createEmbeddedView(this.template);
  }
};
IconFilterComponent.ɵfac = function IconFilterComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || IconFilterComponent)(ɵɵdirectiveInject(ViewContainerRef));
};
IconFilterComponent.ɵcmp = ɵɵdefineComponent({
  type: IconFilterComponent,
  selectors: [["icon-filter"]],
  viewQuery: function IconFilterComponent_Query(rf, ctx) {
    if (rf & 1) {
      ɵɵviewQuery(_c1, 7);
    }
    if (rf & 2) {
      let _t;
      ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.template = _t.first);
    }
  },
  inputs: {
    class: "class"
  },
  decls: 2,
  vars: 0,
  consts: [["template", ""], ["viewBox", "0 0 24 24", "width", "24", "height", "24", "stroke", "currentColor", "stroke-width", "1.5", "fill", "none", "stroke-linecap", "round", "stroke-linejoin", "round", 3, "ngClass"], ["points", "22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"]],
  template: function IconFilterComponent_Template(rf, ctx) {
    if (rf & 1) {
      ɵɵtemplate(0, IconFilterComponent_ng_template_0_Template, 2, 1, "ng-template", null, 0, ɵɵtemplateRefExtractor);
    }
  },
  dependencies: [NgClass],
  encapsulation: 2
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(IconFilterComponent, [{
    type: Component,
    args: [{
      selector: "icon-filter",
      template: `
        <ng-template #template>
            <svg [ngClass]="class" viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
            </svg>
        </ng-template>
    `
    }]
  }], function() {
    return [{
      type: ViewContainerRef
    }];
  }, {
    template: [{
      type: ViewChild,
      args: ["template", {
        static: true
      }]
    }],
    class: [{
      type: Input
    }]
  });
})();
var ColumnHeaderComponent = class {
  constructor(viewContainerRef) {
    this.viewContainerRef = viewContainerRef;
    this.selectAll = new EventEmitter();
    this.sortChange = new EventEmitter();
    this.filterChange = new EventEmitter();
    this.isOpenFilter = null;
  }
  ngOnInit() {
    this.viewContainerRef.createEmbeddedView(this.template);
    this.checkboxChange();
  }
  checkboxChange() {
    if (this.selectedAll) {
      this.selectedAll.nativeElement.indeterminate = this.checkAll !== 0 ? !this.checkAll : false;
      this.selectedAll.nativeElement.checked = this.checkAll;
    }
  }
  toggleFilterMenu(col) {
    if (col) {
      if (this.isOpenFilter === col.field) {
        this.isOpenFilter = null;
      } else {
        this.isOpenFilter = col.field;
      }
    } else {
      this.isOpenFilter = null;
    }
  }
};
ColumnHeaderComponent.ɵfac = function ColumnHeaderComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || ColumnHeaderComponent)(ɵɵdirectiveInject(ViewContainerRef));
};
ColumnHeaderComponent.ɵcmp = ɵɵdefineComponent({
  type: ColumnHeaderComponent,
  selectors: [["column-header"]],
  viewQuery: function ColumnHeaderComponent_Query(rf, ctx) {
    if (rf & 1) {
      ɵɵviewQuery(_c1, 7);
      ɵɵviewQuery(_c2, 5);
    }
    if (rf & 2) {
      let _t;
      ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.template = _t.first);
      ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.selectedAll = _t.first);
    }
  },
  inputs: {
    all: "all",
    isFooter: "isFooter",
    checkAll: "checkAll"
  },
  outputs: {
    selectAll: "selectAll",
    sortChange: "sortChange",
    filterChange: "filterChange"
  },
  decls: 2,
  vars: 0,
  consts: [["template", ""], ["selectedAll", ""], [3, "class", "ngClass", 4, "ngIf"], [4, "ngFor", "ngForOf"], [3, "ngClass"], [1, "bh-checkbox"], ["type", "checkbox", 3, "click"], [1, "check"], [1, "intermediate"], [3, "class", "ngClass", "style", 4, "ngIf"], [1, "bh-flex", "bh-items-center", 3, "click", "ngClass"], ["class", "bh-ml-3 bh-sort bh-flex bh-items-center", 3, "ngClass", 4, "ngIf"], [4, "ngIf"], [1, "bh-ml-3", "bh-sort", "bh-flex", "bh-items-center", 3, "ngClass"], ["width", "16", "height", "16", "viewBox", "0 0 14 14", "fill", "none"], ["points", "3.11,6.25 10.89,6.25 7,1.75", "fill", "currentColor", 1, "bh-text-black/20", 3, "ngClass"], ["points", "7,12.25 10.89,7.75 3.11,7.75", "fill", "currentColor", 1, "bh-text-black/20", 3, "ngClass"], ["class", "bh-filter bh-relative", 4, "ngIf"], [1, "bh-filter", "bh-relative"], ["type", "text", "class", "bh-form-control", 3, "ngModel", "ngModelChange", "keyup", 4, "ngIf"], ["type", "number", "class", "bh-form-control", 3, "ngModel", "ngModelChange", "keyup", 4, "ngIf"], ["type", "date", "class", "bh-form-control", 3, "ngModel", "ngModelChange", "change", 4, "ngIf"], ["class", "bh-form-control", 3, "ngModel", "ngModelChange", "change", "click", 4, "ngIf"], ["type", "button", 3, "click", 4, "ngIf"], [3, "close", "filterChange", "ngClass", "column"], ["type", "text", 1, "bh-form-control", 3, "ngModelChange", "keyup", "ngModel"], ["type", "number", 1, "bh-form-control", 3, "ngModelChange", "keyup", "ngModel"], ["type", "date", 1, "bh-form-control", 3, "ngModelChange", "change", "ngModel"], [1, "bh-form-control", 3, "ngModelChange", "change", "click", "ngModel"], [3, "ngValue"], ["type", "button", 3, "click"], [1, "bh-w-4"]],
  template: function ColumnHeaderComponent_Template(rf, ctx) {
    if (rf & 1) {
      ɵɵtemplate(0, ColumnHeaderComponent_ng_template_0_Template, 3, 2, "ng-template", null, 0, ɵɵtemplateRefExtractor);
    }
  },
  dependencies: [NgClass, NgForOf, NgIf, NgSelectOption, ɵNgSelectMultipleOption, DefaultValueAccessor, NumberValueAccessor, SelectControlValueAccessor, NgControlStatus, NgModel, ColumnFilterComponent, IconCheckComponent, IconDashComponent, IconFilterComponent],
  encapsulation: 2
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ColumnHeaderComponent, [{
    type: Component,
    args: [{
      selector: "column-header",
      template: `
        <ng-template #template>
            <tr>
                <th
                    *ngIf="all.hasCheckbox"
                    [class]="'bh-w-px'"
                    [ngClass]="{
                        'bh-sticky bh-bg-blue-light bh-z-[1]': all.stickyHeader || all.stickyFirstColumn,
                        'bh-top-0': all.stickyHeader,
                        'bh-left-0': all.stickyFirstColumn
                    }"
                >
                    <div class="bh-checkbox">
                        <input #selectedAll type="checkbox" (click)="selectAll.emit(selectedAll.checked); $event.stopPropagation()" />
                        <div>
                            <icon-check class="check"></icon-check>
                            <icon-dash class="intermediate"></icon-dash>
                        </div>
                    </div>
                </th>

                <ng-container *ngFor="let col of all.columns; let j = index">
                    <th
                        *ngIf="!col.hide"
                        [class]="'bh-select-none bh-z-[1]'"
                        [ngClass]="[
                            all.sortable && col.sort ? 'bh-cursor-pointer' : '',
                            j === 0 && all.stickyFirstColumn ? 'bh-sticky bh-left-0 bh-bg-blue-light' : '',
                            all.hasCheckbox && j === 0 && all.stickyFirstColumn ? 'bh-left-[52px]' : ''
                        ]"
                        [style]="{ width: col.width, 'min-width': col.minWidth, 'max-width': col.maxWidth }"
                    >
                        <div class="bh-flex bh-items-center" [ngClass]="[col.headerClass ? col.headerClass : '']" (click)="all.sortable && col.sort && sortChange.emit(col.field)">
                            {{ col.title }}
                            <span *ngIf="all.sortable && col.sort" class="bh-ml-3 bh-sort bh-flex bh-items-center" [ngClass]="[all.sortColumn, all.sortDirection]">
                                <svg width="16" height="16" viewBox="0 0 14 14" fill="none">
                                    <polygon
                                        points="3.11,6.25 10.89,6.25 7,1.75"
                                        fill="currentColor"
                                        class="bh-text-black/20"
                                        [ngClass]="[all.sortColumn === col.field && all.sortDirection === 'asc' ? '!bh-text-primary' : '']"
                                    ></polygon>
                                    <polygon
                                        points="7,12.25 10.89,7.75 3.11,7.75"
                                        fill="currentColor"
                                        class="bh-text-black/20"
                                        [ngClass]="[all.sortColumn === col.field && all.sortDirection === 'desc' ? '!bh-text-primary' : '']"
                                    ></polygon>
                                </svg>
                            </span>
                        </div>

                        <ng-container *ngIf="all.columnFilter && !isFooter">
                            <div *ngIf="col.filter" class="bh-filter bh-relative">
                                <input *ngIf="col.type === 'string'" [(ngModel)]="col.value" type="text" class="bh-form-control" (keyup)="filterChange.emit()" />
                                <input *ngIf="col.type === 'number'" [(ngModel)]="col.value" type="number" class="bh-form-control" (keyup)="filterChange.emit()" />
                                <input *ngIf="col.type === 'date'" [(ngModel)]="col.value" type="date" class="bh-form-control" (change)="filterChange.emit()" />
                                <select *ngIf="col.type === 'bool'" [(ngModel)]="col.value" class="bh-form-control" (change)="filterChange.emit()" (click)="isOpenFilter = null">
                                    <option [ngValue]="undefined">All</option>
                                    <option [ngValue]="true">True</option>
                                    <option [ngValue]="false">False</option>
                                </select>

                                <button *ngIf="col.type !== 'bool'" type="button" (click)="toggleFilterMenu(col); $event.stopPropagation()">
                                    <icon-filter class="bh-w-4"></icon-filter>
                                </button>

                                <column-filter
                                    [ngClass]="{ 'bh-hidden': isOpenFilter !== col.field }"
                                    [column]="col"
                                    (close)="toggleFilterMenu()"
                                    (filterChange)="filterChange.emit()"
                                ></column-filter>
                            </div>
                        </ng-container>
                    </th>
                </ng-container>
            </tr>
        </ng-template>
    `
    }]
  }], function() {
    return [{
      type: ViewContainerRef
    }];
  }, {
    template: [{
      type: ViewChild,
      args: ["template", {
        static: true
      }]
    }],
    selectedAll: [{
      type: ViewChild,
      args: ["selectedAll"]
    }],
    all: [{
      type: Input
    }],
    isFooter: [{
      type: Input
    }],
    checkAll: [{
      type: Input
    }],
    selectAll: [{
      type: Output,
      args: ["selectAll"]
    }],
    sortChange: [{
      type: Output,
      args: ["sortChange"]
    }],
    filterChange: [{
      type: Output,
      args: ["filterChange"]
    }]
  });
})();
var IconLoaderComponent = class {
  constructor() {
  }
};
IconLoaderComponent.ɵfac = function IconLoaderComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || IconLoaderComponent)();
};
IconLoaderComponent.ɵcmp = ɵɵdefineComponent({
  type: IconLoaderComponent,
  selectors: [["icon-loader"]],
  decls: 7,
  vars: 0,
  consts: [["width", "84", "height", "84", "viewBox", "0 0 24 24", 1, "bh-loader", "bh-text-primary"], ["cx", "18", "cy", "12", "r", "0", "fill", "currentColor"], ["attributeName", "r", "begin", ".67", "calcMode", "spline", "dur", "1.5s", "keySplines", "0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8", "repeatCount", "indefinite", "values", "0;2;0;0"], ["cx", "12", "cy", "12", "r", "0", "fill", "currentColor"], ["attributeName", "r", "begin", ".33", "calcMode", "spline", "dur", "1.5s", "keySplines", "0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8", "repeatCount", "indefinite", "values", "0;2;0;0"], ["cx", "6", "cy", "12", "r", "0", "fill", "currentColor"], ["attributeName", "r", "begin", "0", "calcMode", "spline", "dur", "1.5s", "keySplines", "0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8", "repeatCount", "indefinite", "values", "0;2;0;0"]],
  template: function IconLoaderComponent_Template(rf, ctx) {
    if (rf & 1) {
      ɵɵnamespaceSVG();
      ɵɵelementStart(0, "svg", 0)(1, "circle", 1);
      ɵɵelement(2, "animate", 2);
      ɵɵelementEnd();
      ɵɵelementStart(3, "circle", 3);
      ɵɵelement(4, "animate", 4);
      ɵɵelementEnd();
      ɵɵelementStart(5, "circle", 5);
      ɵɵelement(6, "animate", 6);
      ɵɵelementEnd()();
    }
  },
  encapsulation: 2
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(IconLoaderComponent, [{
    type: Component,
    args: [{
      selector: "icon-loader",
      template: `
        <svg width="84" height="84" viewBox="0 0 24 24" class="bh-loader bh-text-primary">
            <circle cx="18" cy="12" r="0" fill="currentColor">
                <animate
                    attributeName="r"
                    begin=".67"
                    calcMode="spline"
                    dur="1.5s"
                    keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
                    repeatCount="indefinite"
                    values="0;2;0;0"
                />
            </circle>
            <circle cx="12" cy="12" r="0" fill="currentColor">
                <animate
                    attributeName="r"
                    begin=".33"
                    calcMode="spline"
                    dur="1.5s"
                    keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
                    repeatCount="indefinite"
                    values="0;2;0;0"
                />
            </circle>
            <circle cx="6" cy="12" r="0" fill="currentColor">
                <animate
                    attributeName="r"
                    begin="0"
                    calcMode="spline"
                    dur="1.5s"
                    keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
                    repeatCount="indefinite"
                    values="0;2;0;0"
                />
            </circle>
        </svg>
    `
    }]
  }], function() {
    return [];
  }, null);
})();
var NgDataTableComponent = class {
  constructor(sanitizer) {
    this.sanitizer = sanitizer;
    this.loading = false;
    this.isServerMode = false;
    this.skin = "bh-table-striped bh-table-hover";
    this.totalRows = 0;
    this.rows = [];
    this.columns = [];
    this.hasCheckbox = false;
    this.search = "";
    this.page = 1;
    this.pageSize = 10;
    this.pageSizeOptions = [10, 20, 30, 50, 100];
    this.showPageSize = true;
    this.rowClass = "";
    this.cellClass = "";
    this.sortable = false;
    this.sortColumn = "id";
    this.sortDirection = "asc";
    this.columnFilter = false;
    this.pagination = true;
    this.showNumbers = true;
    this.showNumbersCount = 5;
    this.showFirstPage = true;
    this.showLastPage = true;
    this.firstArrow = "";
    this.lastArrow = "";
    this.nextArrow = "";
    this.previousArrow = "";
    this.paginationInfo = "Showing {0} to {1} of {2} entries";
    this.noDataContent = "No data available";
    this.stickyHeader = false;
    this.height = "500px";
    this.stickyFirstColumn = false;
    this.cloneHeaderInFooter = false;
    this.selectRowOnClick = false;
    this.changeServer = new EventEmitter();
    this.sortChange = new EventEmitter();
    this.searchChange = new EventEmitter();
    this.pageChange = new EventEmitter();
    this.pageSizeChange = new EventEmitter();
    this.rowSelect = new EventEmitter();
    this.filterChange = new EventEmitter();
    this.rowClick = new EventEmitter();
    this.rowDBClick = new EventEmitter();
    this.filterItems = [];
    this.currentPage = this.page;
    this.currentPageSize = this.pagination ? this.pageSize : this.rows.length;
    this.oldPageSize = this.pageSize;
    this.currentSortColumn = this.sortColumn;
    this.oldSortColumn = this.sortColumn;
    this.currentSortDirection = this.sortDirection;
    this.oldSortDirection = this.sortDirection;
    this.filterRowCount = this.totalRows;
    this.selectedAll = null;
    this.currentLoader = this.loading;
    this.currentSearch = this.search;
    this.uniqueKey = "";
    this.pager = new Pager();
    this.timer = null;
    this.delay = 230;
    this.slotsMap = /* @__PURE__ */ new Map();
  }
  ngOnInit() {
    this.initDeafultValues();
    this.changeRows();
  }
  ngOnChanges(changes) {
    if (changes["loading"] && !changes["loading"].firstChange) {
      this.currentLoader = this.loading;
    }
    if (changes["rows"] && !changes["rows"].firstChange || changes["columns"] && !changes["columns"].firstChange) {
      if (!this.isServerMode) {
        this.currentPage = 1;
        this.oldColumns = this.noReact(this.columns);
      }
      this.changeRows();
    }
    if (!this.isServerMode) {
      if (changes["page"] && !changes["page"].firstChange) {
        this.movePage(this.page);
      }
    }
    if (changes["pageSize"] && !changes["pageSize"].firstChange) {
      this.currentPageSize = this.pagination ? this.pageSize : this.rows.length;
      if (!this.isServerMode) {
        this.changePageSize();
      }
    }
    if (changes["search"] && !changes["search"].firstChange) {
      this.currentSearch = this.search;
      this.changeSearch();
    }
    if (!this.isServerMode) {
      if (changes["sortColumn"] && !changes["sortColumn"].firstChange || changes["sortDirection"] && !changes["sortDirection"].firstChange) {
        this.sortChangeMethod(this.sortColumn, this.sortDirection);
      }
    }
  }
  initDeafultValues() {
    this.currentLoader = this.loading;
    this.currentSearch = this.search;
    this.currentSortColumn = this.sortColumn;
    this.currentSortDirection = this.sortDirection;
    this.filterRowCount = this.totalRows;
    this.currentPage = this.page;
    if (this.pagination) {
      const exists = this.pageSizeOptions.find((d) => d === this.pageSize);
      this.currentPageSize = exists ? this.pageSize : 10;
    } else {
      this.currentPageSize = this.rows.length;
    }
    this.oldPageSize = this.pageSize;
    this.oldSortColumn = this.sortColumn;
    this.oldSortDirection = this.sortDirection;
    for (const item of this.columns || []) {
      const type = item.type?.toLowerCase() || "string";
      item.type = type;
      item.isUnique = item.isUnique !== void 0 ? item.isUnique : false;
      item.hide = item.hide !== void 0 ? item.hide : false;
      item.filter = item.filter !== void 0 ? item.filter : true;
      item.search = item.search !== void 0 ? item.search : true;
      item.sort = item.sort !== void 0 ? item.sort : true;
      item.html = item.html !== void 0 ? item.html : false;
      item.condition = !type || type === "string" ? "contain" : "equal";
    }
    this.oldColumns = this.noReact(this.columns);
    this.setUniqueKey();
  }
  get getProps() {
    return {
      loading: this.currentLoader,
      isServerMode: this.isServerMode,
      skin: this.skin,
      totalRows: this.filterRowCount,
      rows: this.rows,
      columns: this.columns,
      hasCheckbox: this.hasCheckbox,
      search: this.currentSearch,
      page: this.currentPage,
      pageSize: this.currentPageSize,
      pageSizeOptions: this.pageSizeOptions,
      showPageSize: this.showPageSize,
      rowClass: this.rowClass,
      cellClass: this.cellClass,
      sortable: this.sortable,
      sortColumn: this.currentSortColumn,
      sortDirection: this.currentSortDirection,
      columnFilter: this.columnFilter,
      pagination: this.pagination,
      showNumbers: this.showNumbers,
      showNumbersCount: this.showNumbersCount,
      showFirstPage: this.showFirstPage,
      showLastPage: this.showLastPage,
      firstArrow: this.firstArrow,
      lastArrow: this.lastArrow,
      nextArrow: this.nextArrow,
      previousArrow: this.previousArrow,
      paginationInfo: this.paginationInfo,
      noDataContent: this.noDataContent,
      stickyHeader: this.stickyHeader,
      height: this.height,
      stickyFirstColumn: this.stickyFirstColumn,
      cloneHeaderInFooter: this.cloneHeaderInFooter,
      selectRowOnClick: this.selectRowOnClick
    };
  }
  isFunction(value) {
    return typeof value === "function";
  }
  stringFormat() {
    const args = [this.filterRowCount ? this.offset() : 0, this.limit(), this.filterRowCount];
    return this.paginationInfo.replace(/{(\d+)}/g, (match, number) => {
      return typeof args[number] != "undefined" ? args[number] : match;
    });
  }
  setUniqueKey() {
    const col = this.columns.find((d) => d.isUnique);
    this.uniqueKey = col?.field || "";
  }
  maxPage() {
    const totalPages = this.currentPageSize < 1 ? 1 : Math.ceil(this.filterRowCount / this.currentPageSize);
    return Math.max(totalPages || 0, 1);
  }
  offset() {
    return (this.currentPage - 1) * this.currentPageSize + 1;
  }
  limit() {
    const limit = this.currentPage * this.currentPageSize;
    return this.filterRowCount >= limit ? limit : this.filterRowCount;
  }
  getPager() {
    let totalPages = this.maxPage();
    let startPage, endPage;
    let isMaxSized = typeof this.showNumbersCount !== "undefined" && this.showNumbersCount < totalPages;
    if (isMaxSized) {
      startPage = Math.max(this.currentPage - Math.floor(this.showNumbersCount / 2), 1);
      endPage = startPage + this.showNumbersCount - 1;
      if (endPage > totalPages) {
        endPage = totalPages;
        startPage = endPage - this.showNumbersCount + 1;
      }
    } else {
      startPage = 1;
      endPage = totalPages;
    }
    const pages = Array.from(Array(endPage + 1 - startPage).keys()).map((i) => startPage + i);
    return {
      totalRows: this.isServerMode ? this.totalRows : this.filterItems.length,
      currentPage: this.currentPage,
      pageSize: this.pageSize,
      maxPage: totalPages,
      startPage,
      endPage,
      stringFormat: this.stringFormat(),
      pages
    };
  }
  setPager() {
    this.pager = this.getPager();
  }
  filterRows() {
    let result = [];
    let rows = this.rows || [];
    if (this.isServerMode) {
      this.filterRowCount = this.totalRows || 0;
      result = rows;
    } else {
      this.columns?.forEach((d) => {
        if (d.filter && (d.value !== void 0 && d.value !== null && d.value !== "" || d.condition === "is_null" || d.condition === "is_not_null")) {
          if (d.type === "string") {
            if (d.value && !d.condition) {
              d.condition = "contain";
            }
            if (d.condition === "contain") {
              rows = rows.filter((item) => {
                return this.cellValue(item, d.field)?.toString().toLowerCase().includes(d.value.toLowerCase());
              });
            } else if (d.condition === "not_contain") {
              rows = rows.filter((item) => {
                return !this.cellValue(item, d.field)?.toString().toLowerCase().includes(d.value.toLowerCase());
              });
            } else if (d.condition === "equal") {
              rows = rows.filter((item) => {
                return this.cellValue(item, d.field)?.toString().toLowerCase() === d.value.toLowerCase();
              });
            } else if (d.condition === "not_equal") {
              rows = rows.filter((item) => {
                return this.cellValue(item, d.field)?.toString().toLowerCase() !== d.value.toLowerCase();
              });
            } else if (d.condition === "start_with") {
              rows = rows.filter((item) => {
                return this.cellValue(item, d.field)?.toString().toLowerCase().indexOf(d.value.toLowerCase()) === 0;
              });
            } else if (d.condition === "end_with") {
              rows = rows.filter((item) => {
                return this.cellValue(item, d.field)?.toString().toLowerCase().substr(d.value.length * -1) === d.value.toLowerCase();
              });
            }
          } else if (d.type === "number") {
            if (d.value && !d.condition) {
              d.condition = "equal";
            }
            if (d.condition === "equal") {
              rows = rows.filter((item) => {
                return this.cellValue(item, d.field) && parseFloat(this.cellValue(item, d.field)) === parseFloat(d.value);
              });
            } else if (d.condition === "not_equal") {
              rows = rows.filter((item) => {
                return this.cellValue(item, d.field) && parseFloat(this.cellValue(item, d.field)) !== parseFloat(d.value);
              });
            } else if (d.condition === "greater_than") {
              rows = rows.filter((item) => {
                return this.cellValue(item, d.field) && parseFloat(this.cellValue(item, d.field)) > parseFloat(d.value);
              });
            } else if (d.condition === "greater_than_equal") {
              rows = rows.filter((item) => {
                return this.cellValue(item, d.field) && parseFloat(this.cellValue(item, d.field)) >= parseFloat(d.value);
              });
            } else if (d.condition === "less_than") {
              rows = rows.filter((item) => {
                return this.cellValue(item, d.field) && parseFloat(this.cellValue(item, d.field)) < parseFloat(d.value);
              });
            } else if (d.condition === "less_than_equal") {
              rows = rows.filter((item) => {
                return this.cellValue(item, d.field) && parseFloat(this.cellValue(item, d.field)) <= parseFloat(d.value);
              });
            }
          }
          if (d.type === "date") {
            if (d.value && !d.condition) {
              d.condition = "equal";
            }
            if (d.condition === "equal") {
              rows = rows.filter((item) => {
                return this.cellValue(item, d.field) && this.dateFormat(this.cellValue(item, d.field)) === d.value;
              });
            } else if (d.condition === "not_equal") {
              rows = rows.filter((item) => {
                return this.cellValue(item, d.field) && this.dateFormat(this.cellValue(item, d.field)) !== d.value;
              });
            } else if (d.condition === "greater_than") {
              rows = rows.filter((item) => {
                return this.cellValue(item, d.field) && this.dateFormat(this.cellValue(item, d.field)) > d.value;
              });
            } else if (d.condition === "less_than") {
              rows = rows.filter((item) => {
                return this.cellValue(item, d.field) && this.dateFormat(this.cellValue(item, d.field)) < d.value;
              });
            }
          } else if (d.type === "bool") {
            rows = rows.filter((item) => {
              return this.cellValue(item, d.field) === d.value;
            });
          }
          if (d.condition === "is_null") {
            rows = rows.filter((item) => {
              return this.cellValue(item, d.field) == null || this.cellValue(item, d.field) === "";
            });
            d.value = "";
          } else if (d.condition === "is_not_null") {
            d.value = "";
            rows = rows.filter((item) => {
              return this.cellValue(item, d.field);
            });
          }
        }
      });
      if (this.currentSearch && rows.length) {
        let final = [];
        const keys = (this.columns || []).filter((d) => d.search && !d.hide).map((d) => {
          return d.field;
        });
        for (let j = 0; j < rows.length; j++) {
          for (let i = 0; i < keys.length; i++) {
            if (this.cellValue(rows[j], keys[i])?.toString().toLowerCase().includes(this.currentSearch.toLowerCase())) {
              final.push(rows[j]);
              break;
            }
          }
        }
        rows = final;
      }
      const collator = new Intl.Collator(void 0, {
        numeric: true,
        sensitivity: "base"
      });
      const sortOrder = this.currentSortDirection === "desc" ? -1 : 1;
      rows.sort((a, b) => {
        const valA = this.currentSortColumn?.split(".").reduce((obj, key) => obj?.[key], a);
        const valB = this.currentSortColumn?.split(".").reduce((obj, key) => obj?.[key], b);
        return collator.compare(valA, valB) * sortOrder;
      });
      this.filterRowCount = rows.length || 0;
      result = rows.slice(this.offset() - 1, this.limit());
    }
    this.filterItems = result || [];
    this.setPager();
  }
  // page change
  movePage(page = 1) {
    if (this.currentLoader || page < 1 || page > this.maxPage()) {
      return;
    }
    this.currentPage = page;
    this.clearSelectedRows();
    if (this.isServerMode) {
      this.changeForServer("page");
    } else {
      this.filterRows();
      this.pageChange.emit(this.currentPage);
    }
  }
  // row update
  changeRows() {
    this.clearSelectedRows();
    this.filterRows();
  }
  // pagesize changed
  changePageSize() {
    this.currentPage = 1;
    this.clearSelectedRows();
    if (this.isServerMode) {
      this.changeForServer("pagesize", true);
    } else {
      this.filterRows();
      this.pageSizeChange.emit(this.currentPageSize);
    }
  }
  // sorting
  sortChangeMethod(field, dir = "") {
    let direction = dir || "asc";
    if (field === this.currentSortColumn) {
      if (this.currentSortDirection === "asc") {
        direction = "desc";
      }
    }
    const offset = (this.currentPage - 1) * this.currentPageSize;
    const limit = this.currentPageSize;
    this.currentSortColumn = field;
    this.currentSortDirection = direction;
    this.clearSelectedRows();
    if (this.isServerMode) {
      this.changeForServer("sort");
    } else {
      this.filterRows();
      this.sortChange.emit({
        offset,
        limit,
        field,
        direction
      });
    }
  }
  checkboxChange() {
    this.checkIfAllSelected();
    const rows = this.getSelectedRows();
    this.rowSelect.emit(rows);
  }
  selectAll(checked, isAll = false) {
    this.filterItems.map((d) => d.selected = checked);
    if (isAll) {
      this.checkboxChange();
    } else {
      this.checkIfAllSelected();
    }
  }
  checkIfAllSelected() {
    const cnt = this.filterItems.filter((d) => d.selected);
    this.selectedAll = cnt.length && cnt.length === this.filterItems.length;
    setTimeout(() => {
      this.header1?.checkboxChange();
      if (this.cloneHeaderInFooter) {
        this.header2?.checkboxChange();
      }
    });
  }
  // columns filter
  filterChangeMethod() {
    this.currentPage = 1;
    this.clearSelectedRows();
    if (this.isServerMode) {
      this.changeForServer("filter", true);
    } else {
      this.filterRows();
      this.filterChange.emit(this.columns);
    }
  }
  // search
  changeSearch() {
    this.currentPage = 1;
    this.clearSelectedRows();
    if (this.isServerMode) {
      this.changeForServer("search", true);
    } else {
      this.filterRows();
      this.searchChange.emit(this.currentSearch);
    }
  }
  cellValue(item, field = "") {
    return field?.split(".").reduce((obj, key) => obj?.[key], item);
  }
  dateFormat(date) {
    try {
      if (!date) {
        return "";
      }
      const dt = new Date(date);
      const day = dt.getDate();
      const month = dt.getMonth() + 1;
      const year = dt.getFullYear();
      return year + "-" + (month > 9 ? month : "0" + month) + "-" + (day > 9 ? day : "0" + day);
    } catch {
    }
    return "";
  }
  onRowClick(item, index) {
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      if (this.selectRowOnClick) {
        if (this.isRowSelected(index)) {
          this.unselectRow(index);
        } else {
          this.selectRow(index);
        }
        this.checkboxChange();
      }
      this.rowClick.emit(item);
    }, this.delay);
  }
  onRowDoubleClick(item) {
    clearTimeout(this.timer);
    this.rowDBClick.emit(item);
  }
  // emit change event for server side pagination
  changeForServer(changeType, isResetPage = false) {
    if (this.isServerMode) {
      if (changeType === "page") {
        this.setPager();
      }
      this.setDefaultCondition();
      const res = {
        current_page: Number(isResetPage ? 1 : this.currentPage),
        pagesize: Number(this.currentPageSize),
        offset: Number((this.currentPage - 1) * this.currentPageSize),
        sort_column: this.currentSortColumn,
        sort_direction: this.currentSortDirection,
        search: this.currentSearch,
        column_filters: this.columns,
        change_type: changeType
      };
      this.changeServer.emit(res);
    }
  }
  // set default conditions when values exists and condition empty
  setDefaultCondition() {
    for (let i = 0; i < this.columns.length; i++) {
      let d = this.columns[i];
      if (d.filter && (d.value !== void 0 && d.value !== null && d.value !== "" || d.condition === "is_null" || d.condition === "is_not_null")) {
        if (d.type === "string" && d.value && !d.condition) {
          d.condition = "contain";
        }
        if (d.type === "number" && d.value && !d.condition) {
          d.condition = "equal";
        }
        if (d.type === "date" && d.value && !d.condition) {
          d.condition = "equal";
        }
      }
    }
  }
  // methods
  reset() {
    this.columns = this.noReact(this.oldColumns);
    this.currentSearch = "";
    this.currentPage = 1;
    this.currentPageSize = this.oldPageSize;
    this.currentSortColumn = this.oldSortColumn;
    this.currentSortDirection = this.oldSortDirection;
    this.clearSelectedRows();
    if (this.isServerMode) {
      this.changeForServer("reset", true);
    } else {
      this.filterRows();
    }
  }
  getSelectedRows() {
    return this.filterItems.filter((d) => d.selected);
  }
  getColumnFilters() {
    return this.columns;
  }
  clearSelectedRows() {
    if (this.filterItems) {
      this.selectAll(false);
    }
  }
  selectRow(index) {
    if (!this.isRowSelected(index)) {
      const rows = this.filterItems.find((d, i) => i === index);
      if (rows) {
        rows.selected = true;
      }
    }
  }
  unselectRow(index) {
    if (this.isRowSelected(index)) {
      const rows = this.filterItems.find((d, i) => i === index);
      rows.selected = false;
    }
  }
  isRowSelected(index) {
    const rows = this.filterItems.find((d, i) => i === index);
    if (rows) {
      return rows.selected;
    }
    return false;
  }
  // trackby
  trackFilterItems(index, item) {
    return this.uniqueKey ? item[this.uniqueKey] : (this.currentPage - 1) * this.pageSize + index;
  }
  ngAfterContentInit() {
    this.slots.forEach((template) => {
      const fieldName = template.fieldName;
      if (fieldName) {
        this.slotsMap.set(fieldName, template.templateRef);
      }
    });
  }
  hasSlot(fieldName = "") {
    return this.slotsMap.has(fieldName);
  }
  getSlot(fieldName = "") {
    return this.slotsMap.get(fieldName) || this.defaultTemplate;
  }
  // Sanitize and trust the HTML content
  sanitizeHtml(html) {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }
  noReact(value) {
    return JSON.parse(JSON.stringify(value));
  }
  getRange(size) {
    return Array.from({
      length: size
    }, (_, index) => index + 1);
  }
};
NgDataTableComponent.ɵfac = function NgDataTableComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || NgDataTableComponent)(ɵɵdirectiveInject(DomSanitizer));
};
NgDataTableComponent.ɵcmp = ɵɵdefineComponent({
  type: NgDataTableComponent,
  selectors: [["ng-datatable"]],
  contentQueries: function NgDataTableComponent_ContentQueries(rf, ctx, dirIndex) {
    if (rf & 1) {
      ɵɵcontentQuery(dirIndex, SlotDirective, 4);
    }
    if (rf & 2) {
      let _t;
      ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.slots = _t);
    }
  },
  viewQuery: function NgDataTableComponent_Query(rf, ctx) {
    if (rf & 1) {
      ɵɵviewQuery(_c9, 5);
      ɵɵviewQuery(_c10, 5);
      ɵɵviewQuery(_c11, 7);
    }
    if (rf & 2) {
      let _t;
      ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.header1 = _t.first);
      ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.header2 = _t.first);
      ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.defaultTemplate = _t.first);
    }
  },
  inputs: {
    loading: "loading",
    isServerMode: "isServerMode",
    skin: "skin",
    totalRows: "totalRows",
    rows: "rows",
    columns: "columns",
    hasCheckbox: "hasCheckbox",
    search: "search",
    page: "page",
    pageSize: "pageSize",
    pageSizeOptions: "pageSizeOptions",
    showPageSize: "showPageSize",
    rowClass: "rowClass",
    cellClass: "cellClass",
    sortable: "sortable",
    sortColumn: "sortColumn",
    sortDirection: "sortDirection",
    columnFilter: "columnFilter",
    pagination: "pagination",
    showNumbers: "showNumbers",
    showNumbersCount: "showNumbersCount",
    showFirstPage: "showFirstPage",
    showLastPage: "showLastPage",
    firstArrow: "firstArrow",
    lastArrow: "lastArrow",
    nextArrow: "nextArrow",
    previousArrow: "previousArrow",
    paginationInfo: "paginationInfo",
    noDataContent: "noDataContent",
    stickyHeader: "stickyHeader",
    height: "height",
    stickyFirstColumn: "stickyFirstColumn",
    cloneHeaderInFooter: "cloneHeaderInFooter",
    selectRowOnClick: "selectRowOnClick"
  },
  outputs: {
    changeServer: "changeServer",
    sortChange: "sortChange",
    searchChange: "searchChange",
    pageChange: "pageChange",
    pageSizeChange: "pageSizeChange",
    rowSelect: "rowSelect",
    filterChange: "filterChange",
    rowClick: "rowClick",
    rowDBClick: "rowDBClick"
  },
  features: [ɵɵNgOnChangesFeature],
  decls: 13,
  vars: 21,
  consts: [["header1", ""], ["header2", ""], [1, "bh-datatable", "bh-antialiased", "bh-relative", "bh-text-black", "bh-text-sm", "bh-font-normal"], [1, "bh-table-responsive", 3, "ngClass"], [3, "ngClass"], [3, "selectAll", "sortChange", "filterChange", "all", "checkAll"], [4, "ngIf"], [3, "ngClass", 4, "ngIf"], ["class", "bh-absolute bh-inset-0 bh-bg-blue-light/50 bh-grid bh-place-content-center", 4, "ngIf"], ["class", "bh-pagination bh-py-5", 4, "ngIf"], [3, "ngClass", "click", "dblclick", 4, "ngFor", "ngForOf", "ngForTrackBy"], [3, "click", "dblclick", "ngClass"], [4, "ngFor", "ngForOf"], [1, "bh-checkbox", 3, "click"], ["type", "checkbox", 3, "ngModelChange", "change", "value", "ngModel"], [1, "check"], [3, "innerHTML", 4, "ngIf"], [3, "ngTemplateOutlet", "ngTemplateOutletContext"], [3, "innerHTML"], ["class", "!bh-bg-white bh-h-11 !bh-border-transparent", 4, "ngFor", "ngForOf"], [1, "!bh-bg-white", "bh-h-11", "!bh-border-transparent"], [1, "!bh-p-0", "!bh-border-transparent"], [1, "bh-skeleton-box", "bh-h-8"], [3, "selectAll", "sortChange", "filterChange", "all", "isFooter", "checkAll"], [1, "bh-absolute", "bh-inset-0", "bh-bg-blue-light/50", "bh-grid", "bh-place-content-center"], [1, "bh-pagination", "bh-py-5"], [1, "bh-flex", "bh-items-center", "bh-flex-wrap", "bh-flex-col", "sm:bh-flex-row", "bh-gap-4"], [1, "bh-pagination-info", "bh-flex", "bh-items-center"], [1, "bh-mr-2"], ["class", "bh-pagesize", 3, "ngModel", "ngModelChange", 4, "ngIf"], [1, "bh-pagination-number", "sm:bh-ml-auto", "bh-inline-flex", "bh-items-center", "bh-space-x-1"], ["type", "button", "class", "bh-page-item first-page", 3, "disabled", "click", 4, "ngIf"], ["type", "button", 1, "bh-page-item", "previous-page", 3, "click"], ["aria-hidden", "true", "width", "14", "height", "14", "viewBox", "0 0 16 16", 4, "ngIf"], ["type", "button", 1, "bh-page-item", "next-page", 3, "click"], ["type", "button", "class", "bh-page-item last-page", 3, "disabled", "click", 4, "ngIf"], [1, "bh-pagesize", 3, "ngModelChange", "ngModel"], [3, "value", 4, "ngFor", "ngForOf"], [3, "value"], ["type", "button", 1, "bh-page-item", "first-page", 3, "click"], ["aria-hidden", "true", "width", "14", "height", "14", "viewBox", "0 0 16 16"], ["fill", "currentColor", "fill-rule", "evenodd"], ["d", "M8.354 1.646a.5.5 0 0 1 0 .708L2.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"], ["d", "M12.354 1.646a.5.5 0 0 1 0 .708L6.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"], ["fill", "currentColor", "fill-rule", "evenodd", "d", "M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"], ["type", "button", "class", "bh-page-item", 3, "disabled", "bh-active", "click", 4, "ngFor", "ngForOf"], ["type", "button", 1, "bh-page-item", 3, "click"], ["fill", "currentColor", "fill-rule", "evenodd", "d", "M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8L4.646 2.354a.5.5 0 0 1 0-.708z"], ["type", "button", 1, "bh-page-item", "last-page", 3, "click"], ["d", "M3.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L9.293 8L3.646 2.354a.5.5 0 0 1 0-.708z"], ["d", "M7.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L13.293 8L7.646 2.354a.5.5 0 0 1 0-.708z"]],
  template: function NgDataTableComponent_Template(rf, ctx) {
    if (rf & 1) {
      const _r1 = ɵɵgetCurrentView();
      ɵɵelementStart(0, "div", 2)(1, "div", 3)(2, "table", 4)(3, "thead", 4)(4, "column-header", 5, 0);
      ɵɵlistener("selectAll", function NgDataTableComponent_Template_column_header_selectAll_4_listener($event) {
        ɵɵrestoreView(_r1);
        return ɵɵresetView(ctx.selectAll($event, true));
      })("sortChange", function NgDataTableComponent_Template_column_header_sortChange_4_listener($event) {
        ɵɵrestoreView(_r1);
        return ɵɵresetView(ctx.sortChangeMethod($event));
      })("filterChange", function NgDataTableComponent_Template_column_header_filterChange_4_listener() {
        ɵɵrestoreView(_r1);
        return ɵɵresetView(ctx.filterChangeMethod());
      });
      ɵɵelementEnd()();
      ɵɵelementStart(6, "tbody");
      ɵɵtemplate(7, NgDataTableComponent_ng_container_7_Template, 2, 2, "ng-container", 6)(8, NgDataTableComponent_tr_8_Template, 3, 2, "tr", 6)(9, NgDataTableComponent_ng_container_9_Template, 2, 1, "ng-container", 6);
      ɵɵelementEnd();
      ɵɵtemplate(10, NgDataTableComponent_tfoot_10_Template, 3, 6, "tfoot", 7);
      ɵɵelementEnd();
      ɵɵtemplate(11, NgDataTableComponent_div_11_Template, 2, 0, "div", 8);
      ɵɵelementEnd();
      ɵɵtemplate(12, NgDataTableComponent_div_12_Template, 16, 13, "div", 9);
      ɵɵelementEnd();
    }
    if (rf & 2) {
      ɵɵadvance();
      ɵɵstyleMap(ɵɵpureFunction1(13, _c12, ctx.stickyHeader && ctx.height));
      ɵɵproperty("ngClass", ɵɵpureFunction1(15, _c13, ctx.currentLoader));
      ɵɵadvance();
      ɵɵproperty("ngClass", ɵɵpureFunction1(17, _c6, ctx.skin));
      ɵɵadvance();
      ɵɵproperty("ngClass", ɵɵpureFunction1(19, _c14, ctx.stickyHeader));
      ɵɵadvance();
      ɵɵproperty("all", ctx.getProps)("checkAll", ctx.selectedAll);
      ɵɵadvance(3);
      ɵɵproperty("ngIf", ctx.filterRowCount);
      ɵɵadvance();
      ɵɵproperty("ngIf", !ctx.filterRowCount && !ctx.currentLoader);
      ɵɵadvance();
      ɵɵproperty("ngIf", !ctx.filterRowCount && ctx.currentLoader);
      ɵɵadvance();
      ɵɵproperty("ngIf", ctx.cloneHeaderInFooter);
      ɵɵadvance();
      ɵɵproperty("ngIf", ctx.filterRowCount && ctx.currentLoader);
      ɵɵadvance();
      ɵɵproperty("ngIf", ctx.pagination && ctx.filterRowCount);
    }
  },
  dependencies: [NgClass, NgForOf, NgIf, NgTemplateOutlet, NgSelectOption, ɵNgSelectMultipleOption, CheckboxControlValueAccessor, SelectControlValueAccessor, NgControlStatus, NgModel, ColumnHeaderComponent, IconCheckComponent, IconLoaderComponent],
  styles: ['::-webkit-backdrop{--tw-border-spacing-x:0;--tw-border-spacing-y:0;--tw-translate-x:0;--tw-translate-y:0;--tw-rotate:0;--tw-skew-x:0;--tw-skew-y:0;--tw-scale-x:1;--tw-scale-y:1;--tw-pan-x: ;--tw-pan-y: ;--tw-pinch-zoom: ;--tw-scroll-snap-strictness:proximity;--tw-ordinal: ;--tw-slashed-zero: ;--tw-numeric-figure: ;--tw-numeric-spacing: ;--tw-numeric-fraction: ;--tw-ring-inset: ;--tw-ring-offset-width:0px;--tw-ring-offset-color:#fff;--tw-ring-color:#3b82f680;--tw-ring-offset-shadow:0 0 #0000;--tw-ring-shadow:0 0 #0000;--tw-shadow:0 0 #0000;--tw-shadow-colored:0 0 #0000;--tw-blur: ;--tw-brightness: ;--tw-contrast: ;--tw-grayscale: ;--tw-hue-rotate: ;--tw-invert: ;--tw-saturate: ;--tw-sepia: ;--tw-drop-shadow: ;--tw-backdrop-blur: ;--tw-backdrop-brightness: ;--tw-backdrop-contrast: ;--tw-backdrop-grayscale: ;--tw-backdrop-hue-rotate: ;--tw-backdrop-invert: ;--tw-backdrop-opacity: ;--tw-backdrop-saturate: ;--tw-backdrop-sepia: }*,::backdrop,:after,:before{--tw-border-spacing-x:0;--tw-border-spacing-y:0;--tw-translate-x:0;--tw-translate-y:0;--tw-rotate:0;--tw-skew-x:0;--tw-skew-y:0;--tw-scale-x:1;--tw-scale-y:1;--tw-pan-x: ;--tw-pan-y: ;--tw-pinch-zoom: ;--tw-scroll-snap-strictness:proximity;--tw-ordinal: ;--tw-slashed-zero: ;--tw-numeric-figure: ;--tw-numeric-spacing: ;--tw-numeric-fraction: ;--tw-ring-inset: ;--tw-ring-offset-width:0px;--tw-ring-offset-color:#fff;--tw-ring-color:#3b82f680;--tw-ring-offset-shadow:0 0 #0000;--tw-ring-shadow:0 0 #0000;--tw-shadow:0 0 #0000;--tw-shadow-colored:0 0 #0000;--tw-blur: ;--tw-brightness: ;--tw-contrast: ;--tw-grayscale: ;--tw-hue-rotate: ;--tw-invert: ;--tw-saturate: ;--tw-sepia: ;--tw-drop-shadow: ;--tw-backdrop-blur: ;--tw-backdrop-brightness: ;--tw-backdrop-contrast: ;--tw-backdrop-grayscale: ;--tw-backdrop-hue-rotate: ;--tw-backdrop-invert: ;--tw-backdrop-opacity: ;--tw-backdrop-saturate: ;--tw-backdrop-sepia: }*,:after,:before{border:0 solid #0000;box-sizing:border-box}.bh-datatable .bh-table-responsive{position:relative;width:100%;overflow:auto;border-radius:.25rem}.bh-datatable .bh-table-responsive table{width:100%;max-width:100%;border-collapse:collapse!important}.bh-datatable .bh-table-responsive table tfoot tr,.bh-datatable .bh-table-responsive table thead tr{--tw-bg-opacity:1;background-color:rgb(246 247 250/var(--tw-bg-opacity))}.bh-datatable .bh-table-responsive table tbody tr td,.bh-datatable .bh-table-responsive table tfoot tr th,.bh-datatable .bh-table-responsive table thead tr th{padding:.75rem 1rem;text-align:left}.bh-datatable .bh-table-responsive table tfoot tr th,.bh-datatable .bh-table-responsive table thead tr th{vertical-align:top;font-weight:700}.bh-datatable .bh-table-responsive table tbody tr{border-bottom-width:1px;border-style:solid;--tw-border-opacity:1;border-color:rgb(246 247 250/var(--tw-border-opacity))}.bh-datatable .bh-table-responsive table.bh-table-striped tbody tr:nth-child(odd){background-color:#e0e6ed26}.bh-datatable .bh-table-responsive table.bh-table-hover tbody tr:hover{--tw-bg-opacity:1;background-color:rgb(249 250 251/var(--tw-bg-opacity))}.bh-datatable .bh-table-responsive table.bh-table-compact tbody tr td,.bh-datatable .bh-table-responsive table.bh-table-compact thead tr th{padding:.5rem .75rem}.bh-datatable .bh-table-responsive table.bh-table-bordered tbody tr td,.bh-datatable .bh-table-responsive table.bh-table-bordered thead tr th{border-width:1px;border-style:solid;--tw-border-opacity:1;border-color:rgb(246 247 250/var(--tw-border-opacity))}.bh-datatable .bh-pagination .bh-page-item{display:grid;height:2rem;width:2rem;cursor:pointer;-webkit-user-select:none;user-select:none;place-content:center;border-radius:9999px;border:1px solid #0e17264d;--tw-bg-opacity:1;background-color:rgb(255 255 255/var(--tw-bg-opacity));padding:.375rem .625rem;--tw-text-opacity:1;color:rgb(75 85 99/var(--tw-text-opacity));outline-width:0}.bh-datatable .bh-pagination .bh-page-item:hover{--tw-border-opacity:1;border-color:rgb(67 97 238/var(--tw-border-opacity));--tw-bg-opacity:1;background-color:rgb(67 97 238/var(--tw-bg-opacity));--tw-text-opacity:1;color:rgb(255 255 255/var(--tw-text-opacity))}.bh-datatable .bh-pagination .bh-page-item{-webkit-appearance:button;background-image:none}.bh-datatable .bh-pagination .bh-page-item.disabled:not(.bh-active){pointer-events:none;opacity:.5}.bh-datatable .bh-pagination .bh-page-item.bh-active{--tw-border-opacity:1;border-color:rgb(67 97 238/var(--tw-border-opacity));--tw-bg-opacity:1;background-color:rgb(67 97 238/var(--tw-bg-opacity));--tw-text-opacity:1;color:rgb(255 255 255/var(--tw-text-opacity))}.bh-datatable .bh-table-responsive button,.bh-datatable .bh-table-responsive input{outline:2px solid #0000;outline-offset:2px}.bh-datatable .bh-pagination-info .bh-pagesize{box-sizing:border-box;border-radius:.25rem;border-width:1px;border-style:solid;--tw-border-opacity:1;border-color:rgb(224 230 237/var(--tw-border-opacity));--tw-bg-opacity:1;background-color:rgb(255 255 255/var(--tw-bg-opacity));padding:.375rem .5rem;font-weight:400;--tw-text-opacity:1;color:rgb(14 23 38/var(--tw-text-opacity));outline-width:0}.bh-datatable .bh-pagination-info .bh-pagesize:focus{--tw-ring-offset-shadow:var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);--tw-ring-shadow:var(--tw-ring-inset) 0 0 0 calc(1px + var(--tw-ring-offset-width)) var(--tw-ring-color);box-shadow:var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow,0 0 #0000);--tw-ring-color:#e0e6ed66}.bh-datatable .bh-table-responsive table th .bh-filter{margin-top:.125rem;display:flex;height:30px;width:100%;align-items:center}.bh-datatable .bh-table-responsive table th .bh-filter>.bh-form-control{box-sizing:border-box;height:100%;width:100%;min-width:60px;border-top-left-radius:.25rem;border-bottom-left-radius:.25rem;border-width:1px;border-style:solid;--tw-border-opacity:1;border-color:rgb(224 230 237/var(--tw-border-opacity));--tw-bg-opacity:1;background-color:rgb(255 255 255/var(--tw-bg-opacity));padding:.25rem .75rem;font-size:.875rem;line-height:1.25rem;font-weight:400;--tw-text-opacity:1;color:rgb(14 23 38/var(--tw-text-opacity));outline-width:0}.bh-datatable .bh-table-responsive table th .bh-filter>.bh-form-control:focus{--tw-ring-offset-shadow:var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);--tw-ring-shadow:var(--tw-ring-inset) 0 0 0 calc(1px + var(--tw-ring-offset-width)) var(--tw-ring-color);box-shadow:var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow,0 0 #0000);--tw-ring-color:#e0e6ed66}.bh-datatable .bh-table-responsive table th .bh-filter>select{border-radius:.25rem}.bh-datatable .bh-table-responsive table th .bh-filter>button{display:grid;height:30px;width:30px;flex-shrink:0;cursor:pointer;place-content:center;border-top-right-radius:.25rem;border-bottom-right-radius:.25rem;border-width:1px;border-style:solid;--tw-border-opacity:1;border-color:rgb(224 230 237/var(--tw-border-opacity));--tw-bg-opacity:1;background-color:rgb(224 230 237/var(--tw-bg-opacity));color:#0e1726b3}.bh-datatable .bh-table-responsive table th .bh-filter>button:hover{color:#0e1726e6}.bh-datatable .bh-table-responsive table th .bh-filter>button{-webkit-appearance:button;background-image:none}.bh-datatable .bh-filter-menu button{display:flex;width:100%;cursor:pointer;border:1px solid #0000;--tw-bg-opacity:1;background-color:rgb(255 255 255/var(--tw-bg-opacity));padding:.375rem 1rem;text-align:left}.bh-datatable .bh-filter-menu button:hover{--tw-bg-opacity:1;background-color:rgb(243 244 246/var(--tw-bg-opacity));font-weight:700}.bh-datatable .bh-filter-menu button{-webkit-appearance:button;background-image:none}.bh-datatable .bh-filter-menu button.active{--tw-bg-opacity:1;background-color:rgb(243 244 246/var(--tw-bg-opacity));font-weight:700}.bh-datatable .bh-table-responsive input[type=checkbox]{position:absolute;height:1.25rem;width:1.25rem;opacity:0}.bh-datatable .bh-table-responsive input[type=checkbox]+div{display:grid;height:1.25rem;width:1.25rem;place-content:center;border-radius:.25rem;border-width:1px;border-style:solid;--tw-border-opacity:1;border-color:rgb(224 230 237/var(--tw-border-opacity));--tw-bg-opacity:1;background-color:rgb(255 255 255/var(--tw-bg-opacity))}.bh-datatable .bh-table-responsive input[type=checkbox]+div svg{pointer-events:none;display:none;height:.75rem;width:.75rem;fill:currentColor;--tw-text-opacity:1;color:rgb(67 97 238/var(--tw-text-opacity))}.bh-datatable .bh-table-responsive input[type=checkbox]:checked+div,.bh-datatable .bh-table-responsive input[type=checkbox]:indeterminate+div{--tw-border-opacity:1;border-color:rgb(67 97 238/var(--tw-border-opacity));--tw-bg-opacity:1;background-color:rgb(67 97 238/var(--tw-bg-opacity))}.bh-datatable .bh-table-responsive input[type=checkbox]:checked+div svg.check,.bh-datatable .bh-table-responsive input[type=checkbox]:indeterminate+div svg.intermediate{display:flex;--tw-text-opacity:1;color:rgb(255 255 255/var(--tw-text-opacity))}.bh-absolute{position:absolute}.bh-relative{position:relative}.bh-sticky{position:sticky}.bh-inset-0{top:0;right:0;left:0}.bh-bottom-0,.bh-inset-0{bottom:0}.bh-left-0{left:0}.bh-left-\\[52px\\]{left:52px}.bh-right-0{right:0}.bh-top-0{top:0}.bh-top-full{top:100%}.bh-z-10{z-index:10}.bh-z-\\[1\\]{z-index:1}.bh-mb-2{margin-bottom:.5rem}.bh-ml-3{margin-left:.75rem}.bh-mr-2{margin-right:.5rem}.bh-mt-1{margin-top:.25rem}.bh-flex{display:flex}.bh-inline-flex{display:inline-flex}.bh-grid{display:grid}.bh-hidden{display:none}.bh-h-11{height:2.75rem}.bh-h-8{height:2rem}.bh-min-h-\\[300px\\]{min-height:300px}.bh-w-32{width:8rem}.bh-w-4{width:1rem}.bh-w-px{width:1px}.bh-cursor-pointer{cursor:pointer}.bh-select-none{-webkit-user-select:none;user-select:none}.bh-flex-col{flex-direction:column}.bh-flex-wrap{flex-wrap:wrap}.bh-place-content-center{place-content:center}.bh-items-center{align-items:center}.bh-gap-4{gap:1rem}.bh-space-x-1>:not([hidden])~:not([hidden]){--tw-space-x-reverse:0;margin-right:calc(.25rem*var(--tw-space-x-reverse));margin-left:calc(.25rem*(1 - var(--tw-space-x-reverse)))}.bh-overflow-hidden{overflow:hidden}.bh-rounded{border-radius:.25rem}.bh-rounded-md{border-radius:.375rem}.bh-border{border-width:1px}.bh-border-solid{border-style:solid}.\\!bh-border-transparent{border-color:#0000!important}.bh-border-gray-200{--tw-border-opacity:1;border-color:rgb(229 231 235/var(--tw-border-opacity))}.bh-border-gray-300{--tw-border-opacity:1;border-color:rgb(209 213 219/var(--tw-border-opacity))}.\\!bh-bg-white{--tw-bg-opacity:1!important;background-color:rgb(255 255 255/var(--tw-bg-opacity))!important}.bh-bg-blue-light{--tw-bg-opacity:1;background-color:rgb(246 247 250/var(--tw-bg-opacity))}.bh-bg-blue-light\\/50{background-color:#f6f7fa80}.bh-bg-gray-200{background-color:rgb(229 231 235/var(--tw-bg-opacity))}.bh-bg-gray-200,.bh-bg-white{--tw-bg-opacity:1}.bh-bg-white{background-color:rgb(255 255 255/var(--tw-bg-opacity))}.\\!bh-p-0{padding:0!important}.bh-p-10{padding:2.5rem}.bh-p-2{padding:.5rem}.bh-py-5{padding-top:1.25rem;padding-bottom:1.25rem}.bh-text-\\[13px\\]{font-size:13px}.bh-text-sm{font-size:.875rem;line-height:1.25rem}.bh-font-normal{font-weight:400}.\\!bh-text-primary{--tw-text-opacity:1!important;color:rgb(67 97 238/var(--tw-text-opacity))!important}.bh-text-black{--tw-text-opacity:1;color:rgb(14 23 38/var(--tw-text-opacity))}.bh-text-black\\/20{color:#0e172633}.bh-text-primary{--tw-text-opacity:1;color:rgb(67 97 238/var(--tw-text-opacity))}.bh-antialiased{-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}.bh-shadow-md{--tw-shadow:0 4px 6px -1px #0000001a,0 2px 4px -2px #0000001a;--tw-shadow-colored:0 4px 6px -1px var(--tw-shadow-color),0 2px 4px -2px var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow,0 0 #0000),var(--tw-ring-shadow,0 0 #0000),var(--tw-shadow)}.bh-outline-0{outline-width:0}.bh-filter{filter:var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow)}.bh-skeleton-box{position:relative;width:100%;overflow:hidden;--tw-bg-opacity:1;background-color:rgb(243 244 246/var(--tw-bg-opacity))}.bh-skeleton-box:after{position:absolute;inset:0;--tw-translate-x:-100%;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));animation:bhshimmer 2s infinite;background-image:linear-gradient(90deg,#0000,rgba(0,0,0,.025) 20%,#0000000d 50%,#0000);--tw-content:"";content:var(--tw-content)}@keyframes bhshimmer{to{transform:translate(100%)}}.hover\\:bh-opacity-80:hover{opacity:.8}.focus\\:bh-border-gray-200:focus{--tw-border-opacity:1;border-color:rgb(229 231 235/var(--tw-border-opacity))}@media (min-width:640px){.sm\\:bh-ml-auto{margin-left:auto}.sm\\:bh-flex-row{flex-direction:row}}\n'],
  encapsulation: 2,
  changeDetection: 0
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgDataTableComponent, [{
    type: Component,
    args: [{
      selector: "ng-datatable",
      encapsulation: ViewEncapsulation$1.None,
      changeDetection: ChangeDetectionStrategy.OnPush,
      template: `<div class="bh-datatable bh-antialiased bh-relative bh-text-black bh-text-sm bh-font-normal">
    <div class="bh-table-responsive" [ngClass]="{'bh-min-h-[300px]': currentLoader }" [style]="{ height: stickyHeader && height }">
        <table [ngClass]="[skin]">
            <thead [ngClass]="{ 'bh-sticky bh-top-0 bh-z-10': stickyHeader }">
                <column-header
                    #header1
                    [all]="getProps"
                    [checkAll]="selectedAll"
                    (selectAll)="selectAll($event, true)"
                    (sortChange)="sortChangeMethod($event)"
                    (filterChange)="filterChangeMethod()"
                ></column-header>
            </thead>

            <tbody>
                <ng-container *ngIf="filterRowCount">
                    <tr
                        *ngFor="let item of filterItems; let i = index; trackBy:trackFilterItems.bind(this)"
                        [ngClass]="[(isFunction(rowClass) ? rowClass(item) : rowClass), selectRowOnClick? 'bh-cursor-pointer':'']"
                        (click)="onRowClick(item, i)"
                        (dblclick)="onRowDoubleClick(item)"
                    >
                        <td *ngIf="hasCheckbox" [ngClass]="{'bh-sticky bh-left-0 bh-bg-blue-light': stickyFirstColumn}">
                            <div class="bh-checkbox" (click)="$event.stopPropagation();">
                                <input type="checkbox" value="{{item[uniqueKey] ? item[uniqueKey] : i}}" [(ngModel)]="item.selected" (change)="checkboxChange();" />
                                <div>
                                    <icon-check class="check"></icon-check>
                                </div>
                            </div>
                        </td>
                        <ng-container *ngFor="let col of columns; let j = index">
                            <td
                                *ngIf="!col.hide"
                                [ngClass]="[
                                    (isFunction(cellClass) ? cellClass(item) : cellClass),
                                    j === 0 && stickyFirstColumn ? 'bh-sticky bh-left-0 bh-bg-blue-light' : '',
                                    hasCheckbox && j === 0 && stickyFirstColumn ? 'bh-left-[52px]' : '',
                                    col.cellClass ? col.cellClass : ''
                                    ]"
                            >
                                <ng-container *ngIf="hasSlot(col.field)">
                                    <ng-container [ngTemplateOutlet]="getSlot(col.field)" [ngTemplateOutletContext]="{ data: item }"></ng-container>
                                </ng-container>
                                <div *ngIf="!hasSlot(col.field) && col.cellRenderer" [innerHTML]="sanitizeHtml(col.cellRenderer(item))"></div>
                                <ng-container *ngIf="!hasSlot(col.field) && !col.cellRenderer"> {{ cellValue(item, col.field) }} </ng-container>
                            </td>
                        </ng-container>
                    </tr>
                </ng-container>
                <tr *ngIf="!filterRowCount && !currentLoader">
                    <td [attr.colspan]="columns.length + 1">{{ noDataContent }}</td>
                </tr>

                <ng-container *ngIf="!filterRowCount && currentLoader">
                    <tr *ngFor="let k of getRange(pageSize)" class="!bh-bg-white bh-h-11 !bh-border-transparent">
                        <td [attr.colspan]="columns.length + 1" class="!bh-p-0 !bh-border-transparent">
                            <div class="bh-skeleton-box bh-h-8"></div>
                        </td>
                    </tr>
                </ng-container>
            </tbody>

            <tfoot *ngIf="cloneHeaderInFooter" [ngClass]="{ 'bh-sticky bh-bottom-0': stickyHeader }">
                <column-header
                    #header2
                    [all]="getProps"
                    [isFooter]="true"
                    [checkAll]="selectedAll"
                    (selectAll)="selectAll($event)"
                    (sortChange)="sortChangeMethod($event)"
                    (filterChange)="filterChangeMethod()"
                ></column-header>
            </tfoot>
        </table>

        <div *ngIf="filterRowCount && currentLoader" class="bh-absolute bh-inset-0 bh-bg-blue-light/50 bh-grid bh-place-content-center">
            <icon-loader></icon-loader>
        </div>
    </div>

    <div *ngIf="pagination && filterRowCount" class="bh-pagination bh-py-5">
        <div class="bh-flex bh-items-center bh-flex-wrap bh-flex-col sm:bh-flex-row bh-gap-4">
            <div class="bh-pagination-info bh-flex bh-items-center">
                <span class="bh-mr-2"> {{ pager.stringFormat }} </span>
                <select *ngIf="showPageSize" [(ngModel)]="currentPageSize" class="bh-pagesize" (ngModelChange)="changePageSize()">
                    <option *ngFor="let option of pageSizeOptions" [value]="option">{{ option }}</option>
                </select>
            </div>

            <div class="bh-pagination-number sm:bh-ml-auto bh-inline-flex bh-items-center bh-space-x-1">
                <button *ngIf="showFirstPage" type="button" class="bh-page-item first-page" [class.disabled]="currentPage <= 1" (click)="movePage(1)">
                    <span *ngIf="firstArrow" [innerHTML]="sanitizeHtml(firstArrow)"></span>
                    <svg *ngIf="!firstArrow" aria-hidden="true" width="14" height="14" viewBox="0 0 16 16">
                        <g fill="currentColor" fill-rule="evenodd">
                            <path d="M8.354 1.646a.5.5 0 0 1 0 .708L2.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z" />
                            <path d="M12.354 1.646a.5.5 0 0 1 0 .708L6.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z" />
                        </g>
                    </svg>
                </button>
                <button type="button" class="bh-page-item previous-page" [class.disabled]="currentPage <= 1" (click)="movePage(currentPage - 1)">
                    <span *ngIf="previousArrow" [innerHTML]="sanitizeHtml(previousArrow)"></span>
                    <svg *ngIf="!previousArrow" aria-hidden="true" width="14" height="14" viewBox="0 0 16 16">
                        <path
                            fill="currentColor"
                            fill-rule="evenodd"
                            d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
                        />
                    </svg>
                </button>

                <ng-container *ngIf="showNumbers">
                    <button
                        *ngFor="let page of pager.pages"
                        type="button"
                        class="bh-page-item"
                        [class.disabled]="currentPage === page"
                        [class.bh-active]="page === currentPage"
                        (click)="movePage(page)"
                    >
                        {{ page }}
                    </button>
                </ng-container>

                <button type="button" class="bh-page-item next-page" [class.disabled]="currentPage >= maxPage()" (click)="movePage(currentPage + 1)">
                    <span *ngIf="nextArrow" [innerHTML]="sanitizeHtml(nextArrow)"> </span>
                    <svg *ngIf="!nextArrow" aria-hidden="true" width="14" height="14" viewBox="0 0 16 16">
                        <path
                            fill="currentColor"
                            fill-rule="evenodd"
                            d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8L4.646 2.354a.5.5 0 0 1 0-.708z"
                        />
                    </svg>
                </button>

                <button *ngIf="showLastPage" type="button" class="bh-page-item last-page" [class.disabled]="currentPage >= maxPage()" (click)="movePage(maxPage())">
                    <span *ngIf="lastArrow" [innerHTML]="sanitizeHtml(lastArrow)"> </span>
                    <svg *ngIf="!lastArrow" aria-hidden="true" width="14" height="14" viewBox="0 0 16 16">
                        <g fill="currentColor" fill-rule="evenodd">
                            <path d="M3.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L9.293 8L3.646 2.354a.5.5 0 0 1 0-.708z" />
                            <path d="M7.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L13.293 8L7.646 2.354a.5.5 0 0 1 0-.708z" />
                        </g>
                    </svg>
                </button>
            </div>
        </div>
    </div>
</div>
`,
      styles: ['::-webkit-backdrop{--tw-border-spacing-x:0;--tw-border-spacing-y:0;--tw-translate-x:0;--tw-translate-y:0;--tw-rotate:0;--tw-skew-x:0;--tw-skew-y:0;--tw-scale-x:1;--tw-scale-y:1;--tw-pan-x: ;--tw-pan-y: ;--tw-pinch-zoom: ;--tw-scroll-snap-strictness:proximity;--tw-ordinal: ;--tw-slashed-zero: ;--tw-numeric-figure: ;--tw-numeric-spacing: ;--tw-numeric-fraction: ;--tw-ring-inset: ;--tw-ring-offset-width:0px;--tw-ring-offset-color:#fff;--tw-ring-color:#3b82f680;--tw-ring-offset-shadow:0 0 #0000;--tw-ring-shadow:0 0 #0000;--tw-shadow:0 0 #0000;--tw-shadow-colored:0 0 #0000;--tw-blur: ;--tw-brightness: ;--tw-contrast: ;--tw-grayscale: ;--tw-hue-rotate: ;--tw-invert: ;--tw-saturate: ;--tw-sepia: ;--tw-drop-shadow: ;--tw-backdrop-blur: ;--tw-backdrop-brightness: ;--tw-backdrop-contrast: ;--tw-backdrop-grayscale: ;--tw-backdrop-hue-rotate: ;--tw-backdrop-invert: ;--tw-backdrop-opacity: ;--tw-backdrop-saturate: ;--tw-backdrop-sepia: }*,::backdrop,:after,:before{--tw-border-spacing-x:0;--tw-border-spacing-y:0;--tw-translate-x:0;--tw-translate-y:0;--tw-rotate:0;--tw-skew-x:0;--tw-skew-y:0;--tw-scale-x:1;--tw-scale-y:1;--tw-pan-x: ;--tw-pan-y: ;--tw-pinch-zoom: ;--tw-scroll-snap-strictness:proximity;--tw-ordinal: ;--tw-slashed-zero: ;--tw-numeric-figure: ;--tw-numeric-spacing: ;--tw-numeric-fraction: ;--tw-ring-inset: ;--tw-ring-offset-width:0px;--tw-ring-offset-color:#fff;--tw-ring-color:#3b82f680;--tw-ring-offset-shadow:0 0 #0000;--tw-ring-shadow:0 0 #0000;--tw-shadow:0 0 #0000;--tw-shadow-colored:0 0 #0000;--tw-blur: ;--tw-brightness: ;--tw-contrast: ;--tw-grayscale: ;--tw-hue-rotate: ;--tw-invert: ;--tw-saturate: ;--tw-sepia: ;--tw-drop-shadow: ;--tw-backdrop-blur: ;--tw-backdrop-brightness: ;--tw-backdrop-contrast: ;--tw-backdrop-grayscale: ;--tw-backdrop-hue-rotate: ;--tw-backdrop-invert: ;--tw-backdrop-opacity: ;--tw-backdrop-saturate: ;--tw-backdrop-sepia: }*,:after,:before{border:0 solid #0000;box-sizing:border-box}.bh-datatable .bh-table-responsive{position:relative;width:100%;overflow:auto;border-radius:.25rem}.bh-datatable .bh-table-responsive table{width:100%;max-width:100%;border-collapse:collapse!important}.bh-datatable .bh-table-responsive table tfoot tr,.bh-datatable .bh-table-responsive table thead tr{--tw-bg-opacity:1;background-color:rgb(246 247 250/var(--tw-bg-opacity))}.bh-datatable .bh-table-responsive table tbody tr td,.bh-datatable .bh-table-responsive table tfoot tr th,.bh-datatable .bh-table-responsive table thead tr th{padding:.75rem 1rem;text-align:left}.bh-datatable .bh-table-responsive table tfoot tr th,.bh-datatable .bh-table-responsive table thead tr th{vertical-align:top;font-weight:700}.bh-datatable .bh-table-responsive table tbody tr{border-bottom-width:1px;border-style:solid;--tw-border-opacity:1;border-color:rgb(246 247 250/var(--tw-border-opacity))}.bh-datatable .bh-table-responsive table.bh-table-striped tbody tr:nth-child(odd){background-color:#e0e6ed26}.bh-datatable .bh-table-responsive table.bh-table-hover tbody tr:hover{--tw-bg-opacity:1;background-color:rgb(249 250 251/var(--tw-bg-opacity))}.bh-datatable .bh-table-responsive table.bh-table-compact tbody tr td,.bh-datatable .bh-table-responsive table.bh-table-compact thead tr th{padding:.5rem .75rem}.bh-datatable .bh-table-responsive table.bh-table-bordered tbody tr td,.bh-datatable .bh-table-responsive table.bh-table-bordered thead tr th{border-width:1px;border-style:solid;--tw-border-opacity:1;border-color:rgb(246 247 250/var(--tw-border-opacity))}.bh-datatable .bh-pagination .bh-page-item{display:grid;height:2rem;width:2rem;cursor:pointer;-webkit-user-select:none;user-select:none;place-content:center;border-radius:9999px;border:1px solid #0e17264d;--tw-bg-opacity:1;background-color:rgb(255 255 255/var(--tw-bg-opacity));padding:.375rem .625rem;--tw-text-opacity:1;color:rgb(75 85 99/var(--tw-text-opacity));outline-width:0}.bh-datatable .bh-pagination .bh-page-item:hover{--tw-border-opacity:1;border-color:rgb(67 97 238/var(--tw-border-opacity));--tw-bg-opacity:1;background-color:rgb(67 97 238/var(--tw-bg-opacity));--tw-text-opacity:1;color:rgb(255 255 255/var(--tw-text-opacity))}.bh-datatable .bh-pagination .bh-page-item{-webkit-appearance:button;background-image:none}.bh-datatable .bh-pagination .bh-page-item.disabled:not(.bh-active){pointer-events:none;opacity:.5}.bh-datatable .bh-pagination .bh-page-item.bh-active{--tw-border-opacity:1;border-color:rgb(67 97 238/var(--tw-border-opacity));--tw-bg-opacity:1;background-color:rgb(67 97 238/var(--tw-bg-opacity));--tw-text-opacity:1;color:rgb(255 255 255/var(--tw-text-opacity))}.bh-datatable .bh-table-responsive button,.bh-datatable .bh-table-responsive input{outline:2px solid #0000;outline-offset:2px}.bh-datatable .bh-pagination-info .bh-pagesize{box-sizing:border-box;border-radius:.25rem;border-width:1px;border-style:solid;--tw-border-opacity:1;border-color:rgb(224 230 237/var(--tw-border-opacity));--tw-bg-opacity:1;background-color:rgb(255 255 255/var(--tw-bg-opacity));padding:.375rem .5rem;font-weight:400;--tw-text-opacity:1;color:rgb(14 23 38/var(--tw-text-opacity));outline-width:0}.bh-datatable .bh-pagination-info .bh-pagesize:focus{--tw-ring-offset-shadow:var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);--tw-ring-shadow:var(--tw-ring-inset) 0 0 0 calc(1px + var(--tw-ring-offset-width)) var(--tw-ring-color);box-shadow:var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow,0 0 #0000);--tw-ring-color:#e0e6ed66}.bh-datatable .bh-table-responsive table th .bh-filter{margin-top:.125rem;display:flex;height:30px;width:100%;align-items:center}.bh-datatable .bh-table-responsive table th .bh-filter>.bh-form-control{box-sizing:border-box;height:100%;width:100%;min-width:60px;border-top-left-radius:.25rem;border-bottom-left-radius:.25rem;border-width:1px;border-style:solid;--tw-border-opacity:1;border-color:rgb(224 230 237/var(--tw-border-opacity));--tw-bg-opacity:1;background-color:rgb(255 255 255/var(--tw-bg-opacity));padding:.25rem .75rem;font-size:.875rem;line-height:1.25rem;font-weight:400;--tw-text-opacity:1;color:rgb(14 23 38/var(--tw-text-opacity));outline-width:0}.bh-datatable .bh-table-responsive table th .bh-filter>.bh-form-control:focus{--tw-ring-offset-shadow:var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);--tw-ring-shadow:var(--tw-ring-inset) 0 0 0 calc(1px + var(--tw-ring-offset-width)) var(--tw-ring-color);box-shadow:var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow,0 0 #0000);--tw-ring-color:#e0e6ed66}.bh-datatable .bh-table-responsive table th .bh-filter>select{border-radius:.25rem}.bh-datatable .bh-table-responsive table th .bh-filter>button{display:grid;height:30px;width:30px;flex-shrink:0;cursor:pointer;place-content:center;border-top-right-radius:.25rem;border-bottom-right-radius:.25rem;border-width:1px;border-style:solid;--tw-border-opacity:1;border-color:rgb(224 230 237/var(--tw-border-opacity));--tw-bg-opacity:1;background-color:rgb(224 230 237/var(--tw-bg-opacity));color:#0e1726b3}.bh-datatable .bh-table-responsive table th .bh-filter>button:hover{color:#0e1726e6}.bh-datatable .bh-table-responsive table th .bh-filter>button{-webkit-appearance:button;background-image:none}.bh-datatable .bh-filter-menu button{display:flex;width:100%;cursor:pointer;border:1px solid #0000;--tw-bg-opacity:1;background-color:rgb(255 255 255/var(--tw-bg-opacity));padding:.375rem 1rem;text-align:left}.bh-datatable .bh-filter-menu button:hover{--tw-bg-opacity:1;background-color:rgb(243 244 246/var(--tw-bg-opacity));font-weight:700}.bh-datatable .bh-filter-menu button{-webkit-appearance:button;background-image:none}.bh-datatable .bh-filter-menu button.active{--tw-bg-opacity:1;background-color:rgb(243 244 246/var(--tw-bg-opacity));font-weight:700}.bh-datatable .bh-table-responsive input[type=checkbox]{position:absolute;height:1.25rem;width:1.25rem;opacity:0}.bh-datatable .bh-table-responsive input[type=checkbox]+div{display:grid;height:1.25rem;width:1.25rem;place-content:center;border-radius:.25rem;border-width:1px;border-style:solid;--tw-border-opacity:1;border-color:rgb(224 230 237/var(--tw-border-opacity));--tw-bg-opacity:1;background-color:rgb(255 255 255/var(--tw-bg-opacity))}.bh-datatable .bh-table-responsive input[type=checkbox]+div svg{pointer-events:none;display:none;height:.75rem;width:.75rem;fill:currentColor;--tw-text-opacity:1;color:rgb(67 97 238/var(--tw-text-opacity))}.bh-datatable .bh-table-responsive input[type=checkbox]:checked+div,.bh-datatable .bh-table-responsive input[type=checkbox]:indeterminate+div{--tw-border-opacity:1;border-color:rgb(67 97 238/var(--tw-border-opacity));--tw-bg-opacity:1;background-color:rgb(67 97 238/var(--tw-bg-opacity))}.bh-datatable .bh-table-responsive input[type=checkbox]:checked+div svg.check,.bh-datatable .bh-table-responsive input[type=checkbox]:indeterminate+div svg.intermediate{display:flex;--tw-text-opacity:1;color:rgb(255 255 255/var(--tw-text-opacity))}.bh-absolute{position:absolute}.bh-relative{position:relative}.bh-sticky{position:sticky}.bh-inset-0{top:0;right:0;left:0}.bh-bottom-0,.bh-inset-0{bottom:0}.bh-left-0{left:0}.bh-left-\\[52px\\]{left:52px}.bh-right-0{right:0}.bh-top-0{top:0}.bh-top-full{top:100%}.bh-z-10{z-index:10}.bh-z-\\[1\\]{z-index:1}.bh-mb-2{margin-bottom:.5rem}.bh-ml-3{margin-left:.75rem}.bh-mr-2{margin-right:.5rem}.bh-mt-1{margin-top:.25rem}.bh-flex{display:flex}.bh-inline-flex{display:inline-flex}.bh-grid{display:grid}.bh-hidden{display:none}.bh-h-11{height:2.75rem}.bh-h-8{height:2rem}.bh-min-h-\\[300px\\]{min-height:300px}.bh-w-32{width:8rem}.bh-w-4{width:1rem}.bh-w-px{width:1px}.bh-cursor-pointer{cursor:pointer}.bh-select-none{-webkit-user-select:none;user-select:none}.bh-flex-col{flex-direction:column}.bh-flex-wrap{flex-wrap:wrap}.bh-place-content-center{place-content:center}.bh-items-center{align-items:center}.bh-gap-4{gap:1rem}.bh-space-x-1>:not([hidden])~:not([hidden]){--tw-space-x-reverse:0;margin-right:calc(.25rem*var(--tw-space-x-reverse));margin-left:calc(.25rem*(1 - var(--tw-space-x-reverse)))}.bh-overflow-hidden{overflow:hidden}.bh-rounded{border-radius:.25rem}.bh-rounded-md{border-radius:.375rem}.bh-border{border-width:1px}.bh-border-solid{border-style:solid}.\\!bh-border-transparent{border-color:#0000!important}.bh-border-gray-200{--tw-border-opacity:1;border-color:rgb(229 231 235/var(--tw-border-opacity))}.bh-border-gray-300{--tw-border-opacity:1;border-color:rgb(209 213 219/var(--tw-border-opacity))}.\\!bh-bg-white{--tw-bg-opacity:1!important;background-color:rgb(255 255 255/var(--tw-bg-opacity))!important}.bh-bg-blue-light{--tw-bg-opacity:1;background-color:rgb(246 247 250/var(--tw-bg-opacity))}.bh-bg-blue-light\\/50{background-color:#f6f7fa80}.bh-bg-gray-200{background-color:rgb(229 231 235/var(--tw-bg-opacity))}.bh-bg-gray-200,.bh-bg-white{--tw-bg-opacity:1}.bh-bg-white{background-color:rgb(255 255 255/var(--tw-bg-opacity))}.\\!bh-p-0{padding:0!important}.bh-p-10{padding:2.5rem}.bh-p-2{padding:.5rem}.bh-py-5{padding-top:1.25rem;padding-bottom:1.25rem}.bh-text-\\[13px\\]{font-size:13px}.bh-text-sm{font-size:.875rem;line-height:1.25rem}.bh-font-normal{font-weight:400}.\\!bh-text-primary{--tw-text-opacity:1!important;color:rgb(67 97 238/var(--tw-text-opacity))!important}.bh-text-black{--tw-text-opacity:1;color:rgb(14 23 38/var(--tw-text-opacity))}.bh-text-black\\/20{color:#0e172633}.bh-text-primary{--tw-text-opacity:1;color:rgb(67 97 238/var(--tw-text-opacity))}.bh-antialiased{-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}.bh-shadow-md{--tw-shadow:0 4px 6px -1px #0000001a,0 2px 4px -2px #0000001a;--tw-shadow-colored:0 4px 6px -1px var(--tw-shadow-color),0 2px 4px -2px var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow,0 0 #0000),var(--tw-ring-shadow,0 0 #0000),var(--tw-shadow)}.bh-outline-0{outline-width:0}.bh-filter{filter:var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow)}.bh-skeleton-box{position:relative;width:100%;overflow:hidden;--tw-bg-opacity:1;background-color:rgb(243 244 246/var(--tw-bg-opacity))}.bh-skeleton-box:after{position:absolute;inset:0;--tw-translate-x:-100%;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));animation:bhshimmer 2s infinite;background-image:linear-gradient(90deg,#0000,rgba(0,0,0,.025) 20%,#0000000d 50%,#0000);--tw-content:"";content:var(--tw-content)}@keyframes bhshimmer{to{transform:translate(100%)}}.hover\\:bh-opacity-80:hover{opacity:.8}.focus\\:bh-border-gray-200:focus{--tw-border-opacity:1;border-color:rgb(229 231 235/var(--tw-border-opacity))}@media (min-width:640px){.sm\\:bh-ml-auto{margin-left:auto}.sm\\:bh-flex-row{flex-direction:row}}\n']
    }]
  }], function() {
    return [{
      type: DomSanitizer
    }];
  }, {
    loading: [{
      type: Input
    }],
    isServerMode: [{
      type: Input
    }],
    skin: [{
      type: Input
    }],
    totalRows: [{
      type: Input
    }],
    rows: [{
      type: Input
    }],
    columns: [{
      type: Input
    }],
    hasCheckbox: [{
      type: Input
    }],
    search: [{
      type: Input
    }],
    page: [{
      type: Input
    }],
    pageSize: [{
      type: Input
    }],
    pageSizeOptions: [{
      type: Input
    }],
    showPageSize: [{
      type: Input
    }],
    rowClass: [{
      type: Input
    }],
    cellClass: [{
      type: Input
    }],
    sortable: [{
      type: Input
    }],
    sortColumn: [{
      type: Input
    }],
    sortDirection: [{
      type: Input
    }],
    columnFilter: [{
      type: Input
    }],
    pagination: [{
      type: Input
    }],
    showNumbers: [{
      type: Input
    }],
    showNumbersCount: [{
      type: Input
    }],
    showFirstPage: [{
      type: Input
    }],
    showLastPage: [{
      type: Input
    }],
    firstArrow: [{
      type: Input
    }],
    lastArrow: [{
      type: Input
    }],
    nextArrow: [{
      type: Input
    }],
    previousArrow: [{
      type: Input
    }],
    paginationInfo: [{
      type: Input
    }],
    noDataContent: [{
      type: Input
    }],
    stickyHeader: [{
      type: Input
    }],
    height: [{
      type: Input
    }],
    stickyFirstColumn: [{
      type: Input
    }],
    cloneHeaderInFooter: [{
      type: Input
    }],
    selectRowOnClick: [{
      type: Input
    }],
    changeServer: [{
      type: Output
    }],
    sortChange: [{
      type: Output
    }],
    searchChange: [{
      type: Output
    }],
    pageChange: [{
      type: Output
    }],
    pageSizeChange: [{
      type: Output
    }],
    rowSelect: [{
      type: Output
    }],
    filterChange: [{
      type: Output
    }],
    rowClick: [{
      type: Output
    }],
    rowDBClick: [{
      type: Output
    }],
    header1: [{
      type: ViewChild,
      args: ["header1"]
    }],
    header2: [{
      type: ViewChild,
      args: ["header2"]
    }],
    slots: [{
      type: ContentChildren,
      args: [SlotDirective]
    }],
    defaultTemplate: [{
      type: ViewChild,
      args: ["defaultTemplate", {
        static: true
      }]
    }]
  });
})();
var DataTableModule = class {
};
DataTableModule.ɵfac = function DataTableModule_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || DataTableModule)();
};
DataTableModule.ɵmod = ɵɵdefineNgModule({
  type: DataTableModule,
  declarations: [NgDataTableComponent, ColumnFilterComponent, ColumnHeaderComponent, IconCheckComponent, IconDashComponent, IconFilterComponent, IconLoaderComponent, SlotDirective],
  imports: [CommonModule, FormsModule],
  exports: [NgDataTableComponent, ColumnFilterComponent, ColumnHeaderComponent, IconCheckComponent, IconDashComponent, IconFilterComponent, IconLoaderComponent, SlotDirective]
});
DataTableModule.ɵinj = ɵɵdefineInjector({
  imports: [CommonModule, FormsModule]
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DataTableModule, [{
    type: NgModule,
    args: [{
      imports: [CommonModule, FormsModule],
      declarations: [NgDataTableComponent, ColumnFilterComponent, ColumnHeaderComponent, IconCheckComponent, IconDashComponent, IconFilterComponent, IconLoaderComponent, SlotDirective],
      exports: [NgDataTableComponent, ColumnFilterComponent, ColumnHeaderComponent, IconCheckComponent, IconDashComponent, IconFilterComponent, IconLoaderComponent, SlotDirective]
    }]
  }], null, null);
})();
export {
  ColumnFilterComponent,
  ColumnHeaderComponent,
  DataTableModule,
  IconCheckComponent,
  IconDashComponent,
  IconFilterComponent,
  IconLoaderComponent,
  NgDataTableComponent,
  Pager,
  SlotDirective,
  colDef
};
//# sourceMappingURL=@bhplugin_ng-datatable.js.map

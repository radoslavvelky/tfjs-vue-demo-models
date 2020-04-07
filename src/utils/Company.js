"use strict";
/**
 * @typedef {Object} tribefire.extension.demo.model.data.Company
 * @property {decimal} averageRevenue - decimal
 * @property {TribefireJsPropertyConvenience} $averageRevenue - TribefireJsPropertyConvenience
 * @property {tribefire.extension.demo.model.data.Person} ceo - tribefire.extension.demo.model.data.Person
 * @property {TribefireJsPropertyConvenience} $ceo - TribefireJsPropertyConvenience
 * @property {set<tribefire.extension.demo.model.data.Department>} departments - set<tribefire.extension.demo.model.data.Department>
 * @property {TribefireJsPropertyConvenience} $departments - TribefireJsPropertyConvenience
 * @property {set<tribefire.extension.demo.model.data.Person>} employees - set<tribefire.extension.demo.model.data.Person>
 * @property {TribefireJsPropertyConvenience} $employees - TribefireJsPropertyConvenience
 * @property {string} name - string
 * @property {TribefireJsPropertyConvenience} $name - TribefireJsPropertyConvenience
 * @property {map<string,com.braintribe.model.resource.Resource>} paperworkByCategory - map<string,com.braintribe.model.resource.Resource>
 * @property {TribefireJsPropertyConvenience} $paperworkByCategory - TribefireJsPropertyConvenience
 * @property {TribefireJsPropertyConvenience} $reflect - TribefireJsPropertyConvenience
 * @property {string} $desc - string
 * @property {EntityType} $type - EntityType
 * @property {EntityReference} $reference - EntityReference
 * @property {GmSession} $session - GmSession
 */

/**
 * @returns {tribefire.extension.demo.model.data.Company}
 */
export function as(obj) {
  return obj;
}
/** tbd */
export const Property = class {
  /**
   * @type {String} tbd
   */
  name;
  /**
   * @type {Object} tbd
   */
  defaultValue;
  /**
   * @type {GenericModelType} tbd
   */
  type;
  /**
   * @type {EntityType} tbd
   */
  declaringType;
  /**
   * @type {boolean} tbd
   */
  isIdentifier;
  /**
   * @type {boolean} tbd
   */
  isIdentifying;
  /**
   * @type {boolean} tbd
   */
  isNullable;
  /**
   * @type {boolean} tbd
   */
  isPartition;
  /**
   * tbd.
   * @param {GenericEntity} arg0 - tbd
   * @return {Object} tbd
   */
  get(arg0) {}
  /**
   * tbd.
   * @param {GenericEntity} arg0 - tbd
   * @param {Object} arg1 - tbd
   * @return {void} tbd
   */
  set(arg0, arg1) {}
  /**
   * tbd.
   * @param {GenericEntity} arg0 - tbd
   * @return {AbsenceInformation} tbd
   */
  getAbsenceInformation(arg0) {}
  /**
   * tbd.
   * @return {EntityType} tbd
   */
  getDeclaringType() {}
  /**
   * tbd.
   * @param {GenericEntity} arg0 - tbd
   * @return {boolean} tbd
   */
  isAbsent(arg0) {}
};
/** tbd */
export const GenericModelType = class {
  /**
   * @type {String} tbd
   */
  typeName;
  /**
   * @type {boolean} tbd
   */
  isEnum;
  /**
   * @type {Object} tbd
   */
  defaultValue;
  /**
   * @type {TypeCode} tbd
   */
  typeCode;
  /**
   * @type {boolean} tbd
   */
  isBase;
  /**
   * @type {String} tbd
   */
  typeSignature;
  /**
   * @type {boolean} tbd
   */
  isSimple;
  /**
   * @type {boolean} tbd
   */
  isEntity;
  /**
   * @type {boolean} tbd
   */
  isVd;
  /**
   * @type {boolean} tbd
   */
  isCollection;
  /**
   * @type {boolean} tbd
   */
  isNumber;
  /**
   * @type {boolean} tbd
   */
  isScaler;
  /**
   * tbd.
   * @param {Object} arg0 - tbd
   * @return {String} tbd
   */
  getSelectiveInformation(arg0) {}
};
/** tbd */
export const EntityType = class {
  /**
   * @type {boolean} tbd
   */
  isEnum;
  /**
   * @type {boolean} tbd
   */
  isAbstract;
  /**
   * @type {boolean} tbd
   */
  isBase;
  /**
   * @type {String} tbd
   */
  typeSignature;
  /**
   * @type {boolean} tbd
   */
  isSimple;
  /**
   * @type {boolean} tbd
   */
  isVd;
  /**
   * @type {boolean} tbd
   */
  isCollection;
  /**
   * @type {Array<Property>} tbd
   */
  transientProperties;
  /**
   * @type {Property} tbd
   */
  idProperty;
  /**
   * @type {Array<Property>} tbd
   */
  customProperties;
  /**
   * @type {Array<Property>} tbd
   */
  declaredProperties;
  /**
   * @type {List} tbd
   */
  superTypes;
  /**
   * @type {String} tbd
   */
  typeName;
  /**
   * @type {Array<Property>} tbd
   */
  properties;
  /**
   * tbd.
   * @param {string} name - tbd
   * @return {Property} tbd
   */
  getProperty(name) {}
  /**
   * tbd.
   * @param {EntityType} arg0 - tbd
   * @return {boolean} tbd
   */
  isAssignableFrom(arg0) {}
  /**
   * tbd.
   * @param {Object} arg0 - tbd
   * @return {boolean} tbd
   */
  isInstance(arg0) {}
  /**
   * tbd.
   * @param {Object} arg0 - tbd
   * @return {String} tbd
   */
  getSelectiveInformation(arg0) {}
  /**
   * tbd.
   * @param {Object} arg0 - tbd
   * @return {boolean} tbd
   */
  isValueAssignable(arg0) {}
  /**
   * tbd.
   * @param {JavaScriptObject} arg0 - tbd
   * @return {GenericEntity} tbd
   */
  create(arg0) {}
  /**
   * tbd.
   * @param {GenericEntity} arg0 - tbd
   * @param {Object} arg1 - tbd
   * @return {EntityReference} tbd
   */
  createReference(arg0, arg1) {}
};
/** tbd */
export const TribefireJsPropertyConvenience = class {
  /**
   * @type {GenericModelType} tbd
   */
  type;
  /**
   * @type {Object} tbd
   */
  defaultValue;
  /**
   * @type {boolean} tbd
   */
  isAbsent;
  /**
   * @type {boolean} tbd
   */
  isIdentifier;
  /**
   * @type {boolean} tbd
   */
  isIdentifying;
  /**
   * @type {boolean} tbd
   */
  isNullable;
  /**
   * @type {boolean} tbd
   */
  isPartition;
  /**
   * tbd.
   * @param {TraversingCriterion} arg0 - tbd
   * @return {Promise<Object>} tbd
   */
  load(arg0) {}
};
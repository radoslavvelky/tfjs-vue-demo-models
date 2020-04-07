"use strict";
/**
 * @typedef {Object} com.braintribe.model.meta.GmMetaModel
 * @property {list<com.braintribe.model.meta.GmMetaModel>} dependencies - list<com.braintribe.model.meta.GmMetaModel>
 * @property {TribefireJsPropertyConvenience} $dependencies - TribefireJsPropertyConvenience
 * @property {set<com.braintribe.model.meta.data.MetaData>} enumConstantMetaData - set<com.braintribe.model.meta.data.MetaData>
 * @property {TribefireJsPropertyConvenience} $enumConstantMetaData - TribefireJsPropertyConvenience
 * @property {set<com.braintribe.model.meta.data.MetaData>} enumTypeMetaData - set<com.braintribe.model.meta.data.MetaData>
 * @property {TribefireJsPropertyConvenience} $enumTypeMetaData - TribefireJsPropertyConvenience
 * @property {string} globalId - string
 * @property {TribefireJsPropertyConvenience} $globalId - TribefireJsPropertyConvenience
 * @property {object} id - object
 * @property {TribefireJsPropertyConvenience} $id - TribefireJsPropertyConvenience
 * @property {set<com.braintribe.model.meta.data.MetaData>} metaData - set<com.braintribe.model.meta.data.MetaData>
 * @property {TribefireJsPropertyConvenience} $metaData - TribefireJsPropertyConvenience
 * @property {string} name - string
 * @property {TribefireJsPropertyConvenience} $name - TribefireJsPropertyConvenience
 * @property {string} partition - string
 * @property {TribefireJsPropertyConvenience} $partition - TribefireJsPropertyConvenience
 * @property {set<com.braintribe.model.meta.override.GmCustomTypeOverride>} typeOverrides - set<com.braintribe.model.meta.override.GmCustomTypeOverride>
 * @property {TribefireJsPropertyConvenience} $typeOverrides - TribefireJsPropertyConvenience
 * @property {set<com.braintribe.model.meta.GmType>} types - set<com.braintribe.model.meta.GmType>
 * @property {TribefireJsPropertyConvenience} $types - TribefireJsPropertyConvenience
 * @property {string} version - string
 * @property {TribefireJsPropertyConvenience} $version - TribefireJsPropertyConvenience
 * @property {TribefireJsPropertyConvenience} $reflect - TribefireJsPropertyConvenience
 * @property {string} $desc - string
 * @property {EntityType} $type - EntityType
 * @property {EntityReference} $reference - EntityReference
 * @property {GmSession} $session - GmSession
 */

/**
 * @returns {com.braintribe.model.meta.GmMetaModel}
 */
export function as(obj){
    return obj;
}

 /** tbd */
 const TribefireJsPropertyConvenience = class {
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
      * @return {GbPromise} tbd
      */
      load(arg0){}
 }
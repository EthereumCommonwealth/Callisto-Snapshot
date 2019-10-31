/**
 * @file Parity.js
 * @author Samuel Furter <samuel@ethereum.org>
 * @author hackyminer <hackyminer@gmail.com>
 * @license LGPL
 * @date 2019/10/18
 */

import {AbstractWeb3Module} from 'web3-core';

export default class Parity extends AbstractWeb3Module {
    /**
     * TODO: Add missing documentation for getAccounts, lockAccount and sendTransaction!
     * @param {Web3EthereumProvider|HttpProvider|WebsocketProvider|IpcProvider|String} provider
     * @param {MethodFactory} methodFactory
     * @param {Network} net
     * @param {Utils} utils
     * @param {Object} formatters
     * @param {Object} options
     * @param {Net.Socket} nodeNet
     *
     * @constructor
     */
    constructor(provider, methodFactory, net, utils, formatters, options, nodeNet) {
        super(provider, options, methodFactory, nodeNet);

        this.utils = utils;
        this.formatters = formatters;
        this.net = net;
    }

    /**
     * Extends setProvider method from AbstractWeb3Module.
     *
     * @method setProvider
     *
     * @param {Object|String} provider
     * @param {Net} net
     *
     * @returns {Boolean}
     */
    setProvider(provider, net) {
        return !!(super.setProvider(provider, net) && this.net.setProvider(provider, net));
    }

    /**
     * Sets the defaultGasPrice property on the current object and the network module
     *
     * @property defaultGasPrice
     *
     * @param {String} value
     */
    set defaultGasPrice(value) {
        super.defaultGasPrice = value;
        this.net.defaultGasPrice = value;
    }

    /**
     * Gets the defaultGasPrice property
     *
     * @property defaultGasPrice
     *
     * @returns {String|Number} value
     */
    get defaultGasPrice() {
        return super.defaultGasPrice;
    }

    /**
     * Sets the defaultGas property on the current object and the network module
     *
     * @property defaultGas
     *
     * @param {Number} value
     */
    set defaultGas(value) {
        super.defaultGas = value;
        this.net.defaultGas = value;
    }

    /**
     * Gets the defaultGas property
     *
     * @property defaultGas
     *
     * @returns {String|Number} value
     */
    get defaultGas() {
        return super.defaultGas;
    }

    /**
     * Sets the transactionBlockTimeout property on the current object and the network module
     *
     * @property transactionBlockTimeout
     *
     * @param {Number} value
     */
    set transactionBlockTimeout(value) {
        super.transactionBlockTimeout = value;
        this.net.transactionBlockTimeout = value;
    }

    /**
     * Gets the transactionBlockTimeout property
     *
     * @property transactionBlockTimeout
     *
     * @returns {Number} value
     */
    get transactionBlockTimeout() {
        return super.transactionBlockTimeout;
    }

    /**
     * Sets the transactionConfirmationBlocks property on the current object and the network module
     *
     * @property transactionConfirmationBlocks
     *
     * @param {Number} value
     */
    set transactionConfirmationBlocks(value) {
        super.transactionConfirmationBlocks = value;
        this.net.transactionConfirmationBlocks = value;
    }

    /**
     * Gets the transactionConfirmationBlocks property
     *
     * @property transactionConfirmationBlocks
     *
     * @returns {Number} value
     */
    get transactionConfirmationBlocks() {
        return super.transactionConfirmationBlocks;
    }

    /**
     * Sets the transactionPollingTimeout property on the current object and the network module
     *
     * @property transactionPollingTimeout
     *
     * @param {Number} value
     */
    set transactionPollingTimeout(value) {
        super.transactionPollingTimeout = value;
        this.net.transactionPollingTimeout = value;
    }

    /**
     * Gets the transactionPollingTimeout property
     *
     * @property transactionPollingTimeout
     *
     * @returns {Number} value
     */
    get transactionPollingTimeout() {
        return super.transactionPollingTimeout;
    }

    /**
     * Sets the defaultAccount property on the current object and the network module
     *
     * @property defaultAccount
     *
     * @param {String} value
     */
    set defaultAccount(value) {
        super.defaultAccount = value;
        this.net.defaultAccount = value;
    }

    /**
     * Gets the defaultAccount property
     *
     * @property defaultAccount
     *
     * @returns {String} value
     */
    get defaultAccount() {
        return super.defaultAccount;
    }

    /**
     * Sets the defaultBlock property on the current object and the network module
     *
     * @property defaultBlock
     *
     * @param value
     */
    set defaultBlock(value) {
        super.defaultBlock = value;
        this.net.defaultBlock = value;
    }

    /**
     * Gets the defaultBlock property
     *
     * @property defaultBlock
     *
     * @returns {String|Number} value
     */
    get defaultBlock() {
        return super.defaultBlock;
    }
}

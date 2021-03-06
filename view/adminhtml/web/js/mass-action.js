define([
    'jquery',
    'Magento_Ui/js/modal/confirm',
    'text!MyParcelNL_Magento/template/grid/order_massaction.html',
    'Magento_Ui/js/modal/alert'
], function ($, confirmation, template, alert) {
    'use strict';
    console.info('myparcel mass action load');
    //console.info(options);
    //console.info(element);

    return function MassAction(options, element) {

        var model = {

            /**
             * Initializes observable properties.
             *
             * @returns {MassAction} Chainable.
             */
            initialize: function (options, element) {
                this.options = options;
                this.element = element;
                this.selectedIds = [];
                this._setMyParcelMassAction();
                return this;
            },

            /**
             * Set MyParcel Mass action button
             *
             * @protected
             */
            _setMyParcelMassAction: function () {
                var massSelectorLoadInterval;
                var parentThis = this;

                massSelectorLoadInterval = setInterval(function () {
                    console.info('interval mass   myparcel');
                    var actionSelector = $('.action-select-wrap .action-menu');
                    var actionOptions = $('body');
                    if (actionSelector.length) {
                        clearInterval(massSelectorLoadInterval);
                        actionSelector.append(
                            '<li><span class="action-menu-item action-myparcel">MyParcel labels</span></li>'
                        );

                        $('.action-myparcel').on("click", function () {
                            parentThis._showMyParcelOptions();
                        });
                    }
                }, 1000);
            },

            /**
             * Show MyParcel options
             *
             * @protected
             */
            _showMyParcelOptions: function () {
                var parentThis = this;
                parentThis
                    ._setSelectedIds();
                if (this.selectedIds.length == 0) {
                    alert({
                        title: 'Please select an item from the list'
                    });
                } else {
                    confirmation({
                        title: 'MyParcel options',
                        content: template,
                        focus: function () {
                            parentThis
                                ._setMyParcelMassActionObserver()
                                ._setDefaultSettings();
                        },
                        actions: {
                            confirm: function () {
                                parentThis
                                    ._createConsignment();
                            }
                        }
                    });
                }
            },

            /**
             * Set default settings
             *
             * @protected
             */
            _setDefaultSettings: function () {
                var selectAmount = this.selectedIds.length;

                $('#mypa_request_type-download').prop('checked', true).trigger('change');
                $('#mypa_package_type-package').prop('checked', true).trigger('change');
                $('#paper_size-' + this.options.settings['paper_type']).prop('checked', true).trigger('change');

                if(selectAmount != 0) {
                    console.log(selectAmount);
                    if (selectAmount >= 1) {
                        $('#mypa_postition-1').prop('checked', true);
                    }
                    if (selectAmount >= 2) {
                        $('#mypa_postition-2').prop('checked', true);
                    }
                    if (selectAmount >= 3) {
                        $('#mypa_postition-3').prop('checked', true);
                    }
                    if (selectAmount >= 4) {
                        $('#mypa_postition-4').prop('checked', true);
                    }
                }
                return this;
            },

            /**
             * MyParcel action observer
             *
             * @protected
             */
            _setMyParcelMassActionObserver: function () {
                var parentThis = this;

                $("input[name='paper_size']").on("change", function () {
                    if ($('#paper_size-A4').prop('checked')) {
                        $('.mypa_position_selector').addClass('_active');
                    } else {
                        $('.mypa_position_selector').removeClass('_active');
                    }
                });

                $("input[name='mypa_request_type']").on("change", function () {
                    if ($('#mypa_request_type-download').prop('checked')) {
                        $('.mypa_position_container').show();
                    } else {
                        $('.mypa_position_container').hide();
                    }
                });
                return this;
            },

            /**
             * Create consignment
             *
             * @protected
             */
            _setSelectedIds: function () {
                var parentThis = this;
                this.selectedIds = [];

                $('.data-grid-checkbox-cell-inner input.admin__control-checkbox:checked').each(function () {
                    parentThis.selectedIds.push($(this).attr('value'));
                });
                $('#selected_ids').val(this.selectedIds.join(','));
                return this;
            },

            /**
             * Create consignment
             *
             * @protected
             */
            _createConsignment: function () {
                window.location.href = this.options.url + '?' + $("#mypa-options-form").serialize();
            }
        };

        model.initialize(options, element);
        return model;
    };
});
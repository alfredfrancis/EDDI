function OutputContentModel(dataProvider, actionHandler) {
    this.defaultTableControlLimit = 10;
    this.defaultTableControlIndex = 0;
    this.defaultTableControlOrder = 'asc';

    var tableControl;
    var tableControlLimit = this.defaultTableControlLimit;
    var tableControlIndex = this.defaultTableControlIndex;
    var tableControlFilter;
    var tableControlOrder = this.defaultTableControlOrder;

    this.getTableControl = function () {
        return tableControl;
    }

    this.makeContentModel = function (sizeCallbackInstance, selectionCallbackInstance) {
        var models = [];

        var urlParams = $.url.parse(window.location.href).params;
        if (typeof urlParams !== 'undefined') {
            if (typeof urlParams['limit'] !== 'undefined') {
                tableControlLimit = parseInt(decodeURIComponent(urlParams['limit'])) || this.defaultTableControlLimit;
            }

            if (typeof urlParams['index'] !== 'undefined') {
                tableControlIndex = parseInt(decodeURIComponent(urlParams['index'])) || this.defaultTableControlIndex;
            }

            if (typeof urlParams['filter'] !== 'undefined') {
                tableControlFilter = decodeURIComponent(urlParams['filter']);
            }

            if (typeof urlParams['order'] !== 'undefined') {
                tableControlOrder = decodeURIComponent(urlParams['order']);
            }
        }

        var outputSet = dataProvider.readActiveOutputSet(tableControlLimit, tableControlIndex, tableControlFilter, tableControlOrder);

        application.contentModelHelper.createDocumentDescriptorDisplayControl();
        application.contentModelHelper.createResourceVersionSelectorControl();
        application.contentModelHelper.createReturnToParentButton();
        application.contentModelHelper.createLanguageSelector();

        var outputSetColumns = [
            new TableControlColumnModel({columnIdentifier:'selection'}, window.lang.convert('DICTIONARY_TABLE_COL_SELECTION'), 'table_col_selection', false, false),
            new TableControlColumnModel({columnIdentifier:'key'}, window.lang.convert('DICTIONARY_TABLE_COL_ENTRY'), 'table_col_entry', false, true),
            new TableControlColumnModel({columnIdentifier:'occurrence'}, window.lang.convert('DICTIONARY_TABLE_COL_OCCURRENCE'), 'table_col_occurrence', false, true),
            new TableControlColumnModel({columnIdentifier:'outputValues'}, window.lang.convert('DICTIONARY_TABLE_COL_OUTPUTVALUES'), 'table_col_outputvalues', true, true)
        ];

        var outputSetData = [];
        for (var i = 0; i < outputSet.outputs.length; ++i) {
            outputSetData.push([ '<img class="dataTables_dotbutton" src="/binary/default/desktop/images/dotbutton.png"/>', outputSet.outputs[i].key, outputSet.outputs[i].occurrence, outputSet.outputs[i].outputValues ]);
        }

        var tableModel = new TableControlModel(0, 'dictionary_table_', true, true, outputSetColumns, new TableControlDataModel({dataType:'outputs'}, outputSetData), tableControlLimit, tableControlIndex, tableControlFilter);

        tableControl = new TableControl(tableModel);
        tableControl.observable.addObserver(actionHandler.observer);
        models.push(tableControl);
        return models;
    }

    this.addChildControl = function(data) {
        tableControl.addRow(data);
    }
}
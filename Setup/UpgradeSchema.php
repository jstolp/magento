<?php
/**
 * Short_description
 *
 * LICENSE: This source file is subject to the Creative Commons License.
 * It is available through the world-wide-web at this URL:
 * http://creativecommons.org/licenses/by-nc-nd/3.0/nl/deed.en_US
 *
 * If you want to add improvements, please create a fork in our GitHub:
 * https://github.com/myparcelnl
 *
 * @author      Reindert Vetter <reindert@myparcel.nl>
 * @copyright   2010-2016 MyParcel
 * @license     http://creativecommons.org/licenses/by-nc-nd/3.0/nl/deed.en_US  CC BY-NC-ND 3.0 NL
 * @link        https://github.com/myparcelnl/magento
 * @since       File available since Release 0.1.0
 */

namespace MyParcelNL\Magento\Setup;

use Magento\Framework\DB\Ddl\Table;
use Magento\Framework\Setup\UpgradeSchemaInterface;
use Magento\Framework\Setup\ModuleContextInterface;
use Magento\Framework\Setup\SchemaSetupInterface;
class UpgradeSchema implements  UpgradeSchemaInterface
{
    public function upgrade(SchemaSetupInterface $setup,
                            ModuleContextInterface $context){
        $setup->startSetup();


        if (version_compare($context->getVersion(), '0.0.1') < 0) {

            // Add column to track table
            $tableName = $setup->getTable('sales_shipment_track');
            // Check if the table already exists
            if ($setup->getConnection()->isTableExists($tableName) == true) {
                $setup->getConnection()->addColumn(
                    $tableName,
                    'api_id',
                    [
                        'type' => Table::TYPE_INTEGER,
                        'comment' => 'MyParcel id',
                    ]
                );
                $setup->getConnection()->addColumn(
                    $tableName,
                    'api_status',
                    [
                        'type' => Table::TYPE_INTEGER,
                        'comment' => 'MyParcel status',
                    ]
                );
            }

            // Add status column to show in order grid
            $tableName = $setup->getTable('sales_order');
            if ($setup->getConnection()->isTableExists($tableName) == true) {
                $setup->getConnection()->addColumn(
                    $tableName,
                    'track_status',
                    [
                        'type' => Table::TYPE_TEXT,
                        'comment' => 'Status of MyParcel consignment'
                    ]
                );
                $setup->getConnection()->addColumn(
                    $tableName,
                    'track_number',
                    [
                        'type' => Table::TYPE_TEXT,
                        'comment' => 'Track number of MyParcel consignment'
                    ]
                );
            }

            // Add status column to show in order grid
            $tableName = $setup->getTable('sales_order_grid');
            if ($setup->getConnection()->isTableExists($tableName) == true) {
                $setup->getConnection()->addColumn(
                    $tableName,
                    'track_status',
                    [
                        'type' => Table::TYPE_TEXT,
                        'comment' => 'Status of MyParcel consignment'
                    ]
                );
                $setup->getConnection()->addColumn(
                    $tableName,
                    'track_number',
                    [
                        'type' => Table::TYPE_TEXT,
                        'comment' => 'Track number of MyParcel consignment'
                    ]
                );
            }
        }

        $setup->endSetup();
    }
}
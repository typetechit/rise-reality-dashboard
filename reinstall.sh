php artisan migrate:fresh
php artisan db:seed --class=CountryTableSeeder
php artisan db:seed --class=StateTableSeeder
php artisan db:seed --class=CityTableSeeder

php artisan db:seed --class=AdminUserSeeder
php artisan db:seed --class=PropertyAgentUserSeeder
php artisan db:seed --class=CategoryDemoDataSeeder
php artisan db:seed --class=PropertyCategoryTableSeeder
php artisan db:seed --class=PropertyTableSeeder
php artisan db:seed --class=PostTableSeeder

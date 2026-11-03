FROM php:8.5-apache

RUN apt-get update && apt-get install -y \
    git \
    unzip \
    libzip-dev \
    libssl-dev \
    pkg-config \
    && docker-php-ext-install zip pdo \
    && pecl install mongodb \
    && docker-php-ext-enable mongodb

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

RUN a2enmod rewrite

WORKDIR /var/www/html

# esto lo pongo para que en render me detecte la carpeta, ya que el docker-compose no lo lee

COPY . /var/www/html/

RUN composer install

# aqui le doy los permisos

RUN chown -R www-data:www-data /var/www/html
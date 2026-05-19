FROM php:8.3-apache

# Remove conflicting MPM modules and enable the correct one
RUN apt-get update && \
    apt-get install -y --no-install-recommends apache2-utils && \
    a2dismod mpm_event mpm_worker && \
    a2enmod mpm_prefork rewrite && \
    docker-php-ext-install mysqli && \
    apt-get clean && rm -rf /var/lib/apt/lists/*

# Copy files
COPY . /var/www/html/

# Set permissions
RUN chown -R www-data:www-data /var/www/html

EXPOSE 3000

CMD ["apache2-foreground"]

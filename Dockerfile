FROM php:8.3-apache

# Install required extensions and enable mod_rewrite
RUN docker-php-ext-install mysqli && \
    a2enmod rewrite

# Copy files to web root
COPY . /var/www/html/

# Set proper permissions
RUN chown -R www-data:www-data /var/www/html

# Expose port
EXPOSE 80

# Start Apache
CMD ["apache2-foreground"]

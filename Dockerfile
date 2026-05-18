FROM php:8.3-apache

# Enable required PHP modules
RUN docker-php-ext-install mysqli && \
    a2enmod rewrite

# Copy all files (including index.php) into the web root
COPY . /var/www/html/

# Expose port 80
EXPOSE 80

# Start Apache
CMD ["apache2-foreground"]

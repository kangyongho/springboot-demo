package net.ddns.config;

import org.springframework.context.annotation.PropertySource;
import org.springframework.stereotype.Component;

/**
 * Created by NPOST on 2016-12-28.
 */
@Component
@PropertySource(value="file:C:\\properties\\application-dev.properties", ignoreResourceNotFound=true)
@PropertySource(value="file:C:\\properties\\application-prod.properties", ignoreResourceNotFound=true)
@PropertySource(value="file:///home/ubuntu/.property/application-prod.properties", ignoreResourceNotFound=true)
@PropertySource(value="file:///home/daniel/.property/application-prod.properties", ignoreResourceNotFound=true)
public class ExternalProperty {

}

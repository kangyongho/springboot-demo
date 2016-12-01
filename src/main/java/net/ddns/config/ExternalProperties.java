package net.ddns.config;

import org.springframework.context.annotation.PropertySource;
import org.springframework.stereotype.Component;

/**
 * Created by NPOST on 2016-12-01.
 */
@Component
@PropertySource(value="file:C:\\properties\\application-dev.properties")
@PropertySource(value="file:C:\\properties\\application-test.properties")
/* Exception ignore when not loaded file put the ignoreResourceNotFound=true */
//@PropertySource(value="file:C:\\properties\\application-devtest.properties")
@PropertySource(value="file:C:\\properties\\application-devtest.properties", ignoreResourceNotFound=true)
/* multiple load file */
//@PropertySource({"file:C:\\properties\\application-dev.properties", "file:C:\\properties\\application-test.properties"})
public class ExternalProperties {

    // TODO: check the getter/setter method
}

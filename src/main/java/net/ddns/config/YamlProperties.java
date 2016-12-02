package net.ddns.config;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.Map;

/**
 * Created by NPOST on 2016-12-01.
 */
@Component
//내부 설정파일
//@ConfigurationProperties(locations = {"classpath:fixture.yml"}, prefix = "environments")
//외부 설정파일
@ConfigurationProperties(locations = {"file:C:\\properties\\application.yml"}, prefix = "environments")
//@ConfigurationProperties(prefix = "environments")
public class YamlProperties {

    private Map<String, String> dev = new HashMap<>();
    private Map<String, String> prod = new HashMap<>();

    public Map<String, String> getDev() {
        return this.dev;
    }

    public Map<String, String> getProd() {
        return this.prod;
    }
}

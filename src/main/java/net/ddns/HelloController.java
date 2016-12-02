package net.ddns;

import net.ddns.config.YamlProperties;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.text.DateFormat;
import java.util.Date;
import java.util.Locale;
import java.util.Map;

/**
 * Created by NPOST on 2016-11-24.
 */

@Controller
public class HelloController {

    @RequestMapping("/")
    public String mainPage() {
        return "main_page";
    }

    @RequestMapping("hello")
    public String index(Locale locale, Model model) {
        Date date = new Date();
        DateFormat dateFormat = DateFormat.getDateTimeInstance(DateFormat.LONG, DateFormat.LONG, locale);
        String formatteDate = dateFormat.format(date);

        model.addAttribute("servertime", formatteDate);
        model.addAttribute("name", "Spring from daniel");

        return "hello";
    }

    @RequestMapping("demo")
    public String demo(Locale locale, Model model) {
        Date date = new Date();
        DateFormat dateFormat = DateFormat.getDateTimeInstance(DateFormat.LONG, DateFormat.LONG, locale);
        String formatteDate = dateFormat.format(date);

        model.addAttribute("servertime", formatteDate);
        model.addAttribute("name", "Spring from daniel");

        return "demo/hello-demo";
    }

    @RequestMapping("spring")
    public String spring() { return "spring/spring_main"; }

    @RequestMapping("123")
    public String startSpringxyz() { return  "spring/category/category"; }

    @RequestMapping("spring/start")
    public String startSpring() { return  "spring/category/category"; }

    @RequestMapping("spring/start/123")
    public String startSpring123() { return  "spring/category/category"; }

    // file download
    @RequestMapping(value = "/down", method = RequestMethod.GET)
    public void getFile(HttpServletResponse response) {
        try {
            InputStream is = new FileInputStream("C:\\GitHub\\springboot-demo\\src\\main\\resources\\static\\file\\temp.txt");
            org.apache.commons.io.IOUtils.copy(is, response.getOutputStream());
            response.setHeader("Content-Disposition", "attachment;filename=downloadname.txt");
            response.setContentType("text/plain");
            response.flushBuffer();
            is.close();
        } catch (IOException e) {
            e.printStackTrace();
            //TODO log 처리
        }
    }

    @RequestMapping("pdf")
    public void getPdf(HttpServletResponse response) throws IOException {
        //System.out.println(classPathResource.getURL());
        //System.out.println(classPathResource.exists());
        //System.out.println(classPathResource.getFile());
        try {
            ClassPathResource classPathResource = new ClassPathResource("static/file/pdf_test.pdf");
            InputStream inputStream = new FileInputStream(classPathResource.getFile());
            org.apache.commons.io.IOUtils.copy(inputStream, response.getOutputStream());
            response.setHeader("Content-Disposition", "attachment;filename=test.pdf");
            response.setContentType("application/pdf");
            response.flushBuffer();
            inputStream.close();
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    //외부설정 .properties 파일 Environments
    @Value("${logging.level.org.springframework}")
    String mode;
    @Value("${name}")
    String name;
    @Value("${password}")
    String pw;

    //외부설정 .yaml 파일 Environments
    @Autowired
    private YamlProperties yamlProperties;

    @RequestMapping("property")
    public String getProperty(Model model) {
        System.out.println("@PropertySource from .properties");
        System.out.println("mode : " + mode);
        System.out.println("name : " + name);
        System.out.println("password : " + pw);
        model.addAttribute("name", name);
        model.addAttribute("password", pw);
        model.addAttribute("log", mode);

        System.out.println("@ConfigurationProperties from .yaml");
        Map<String, String> dev = yamlProperties.getDev();
        Map<String, String> prod = yamlProperties.getProd();
        System.out.println("environments.dev.url: " + dev.get("url"));
        System.out.println("environments.dev.name: " + dev.get("name"));
        System.out.println("environments.prod.url: " + prod.get("url"));
        System.out.println("environments.prod.name: " + prod.get("name"));
        model.addAttribute("urldev", dev.get("url"));
        model.addAttribute("namedev", dev.get("name"));
        model.addAttribute("urlprod", prod.get("url"));
        model.addAttribute("nameprod", prod.get("name"));
        return "demo/properties-test-demo";
    }

}

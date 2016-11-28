package net.ddns;

import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.util.ResourceUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.text.DateFormat;
import java.util.Date;
import java.util.Locale;

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
    public String spring() {
        return "spring/spring_main";
    }

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
}

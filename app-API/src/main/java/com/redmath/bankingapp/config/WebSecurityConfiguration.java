package com.redmath.bankingapp.config;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.csrf.CookieCsrfTokenRepository;
import org.springframework.security.web.csrf.CsrfTokenRequestAttributeHandler;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

@EnableMethodSecurity
@EnableConfigurationProperties
@Configuration
public class WebSecurityConfiguration {

    @Bean
    public WebSecurityCustomizer webSecurityCustomizer() {

        return web -> web.ignoring().requestMatchers(
                new AntPathRequestMatcher("/", "GET"),
                new AntPathRequestMatcher("/actuator", "GET"),
                new AntPathRequestMatcher("/actuator/**","GET"),
                new AntPathRequestMatcher("/static/**","GET"),
                new AntPathRequestMatcher("/static/**","POST"),
                new AntPathRequestMatcher("/h2-console/**", "GET"),
                new AntPathRequestMatcher("/h2-console/**", "POST")
        );
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.formLogin(formLogin->formLogin.defaultSuccessUrl("http://localhost:3000", true).permitAll());
        http.authorizeHttpRequests(config -> config.anyRequest().authenticated());
        //http.csrf(csrf->csrf.disable());
        CookieCsrfTokenRepository csrfRepository = CookieCsrfTokenRepository.withHttpOnlyFalse();
        csrfRepository.setCookiePath("/");
        http.csrf(config -> config.csrfTokenRepository(csrfRepository)
                .csrfTokenRequestHandler(new CsrfTokenRequestAttributeHandler()));
        http.cors(Customizer.withDefaults());
        return http.build();
    }


    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList("http://localhost:3000"));
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        configuration.setAllowCredentials(true);
        configuration.addAllowedHeader("*");

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}

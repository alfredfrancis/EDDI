package io.sls.resources.rest.bots.model;


import java.net.URI;
import java.util.ArrayList;
import java.util.List;

/**
 * User: jarisch
 * Date: 20.05.12
 * Time: 19:41
 */
public class BotConfiguration {
    private boolean authenticationRequired;
    private List<URI> packages;

    public BotConfiguration() {
        authenticationRequired = true;
        this.packages = new ArrayList<URI>();
    }

    public boolean isAuthenticationRequired() {
        return authenticationRequired;
    }

    public void setAuthenticationRequired(boolean authenticationRequired) {
        this.authenticationRequired = authenticationRequired;
    }

    public List<URI> getPackages() {
        return packages;
    }

    public void setPackages(List<URI> packages) {
        this.packages = packages;
    }
}
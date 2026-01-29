# caddy configuration for compiler
compiler.bitwiselearn.com {
    reverse_proxy 127.0.0.1:2000 127.0.0.1:2001 127.0.0.1:2002 {
        lb_policy round_robin

        health_uri /
        health_interval 15s
        health_timeout 5s
    }
}


#caddy configuration for bitwise-learn frontend staging 
staging.bitwiselearn.com {
    reverse_proxy http://127.0.0.1:3000
}

#caddy configuration for bitwise-learn backend staging 
staging.backend.bitwiselearn.com {
    reverse_proxy http://127.0.0.1:8000
}

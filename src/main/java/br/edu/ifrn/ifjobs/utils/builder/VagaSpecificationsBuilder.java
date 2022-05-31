package br.edu.ifrn.ifjobs.utils.builder;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.data.jpa.domain.Specification;

import br.edu.ifrn.ifjobs.model.Vaga;
import br.edu.ifrn.ifjobs.utils.CriterioBusca;
import br.edu.ifrn.ifjobs.utils.specification.VagaSpecification;

public class VagaSpecificationsBuilder {

    private final List<CriterioBusca> params;

    public VagaSpecificationsBuilder() {
        params = new ArrayList<>();
    }

    public VagaSpecificationsBuilder with(String key, String operation, Object value) {
        params.add(new CriterioBusca(key, operation, value));
        return this;
    }

    public Specification<Vaga> build() {
        if (params.size() == 0) {
            return null;
        }

        List<Specification> specs = params.stream()
                .map(VagaSpecification::new)
                .collect(Collectors.toList());

        Specification result = specs.get(0);

        for (int i = 1; i < params.size(); i++) {
            result = params.get(i)
                    .isOrPredicate()
                            ? Specification.where(result)
                                    .or(specs.get(i))
                            : Specification.where(result)
                                    .and(specs.get(i));
        }
        return result;
    }

}

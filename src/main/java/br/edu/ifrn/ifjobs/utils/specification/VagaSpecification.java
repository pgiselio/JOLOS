package br.edu.ifrn.ifjobs.utils.specification;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import org.springframework.data.jpa.domain.Specification;

import br.edu.ifrn.ifjobs.model.Vaga;
import br.edu.ifrn.ifjobs.utils.CriterioBusca;

public class VagaSpecification implements Specification<Vaga> {

    private CriterioBusca criterioBusca;

    public VagaSpecification(CriterioBusca criterioBusca) {
        this.criterioBusca = criterioBusca;
    }

    public VagaSpecification() {
    }

    @Override
    public Predicate toPredicate(Root<Vaga> root, CriteriaQuery<?> query, CriteriaBuilder builder) {
        if (criterioBusca.getOperacao().equalsIgnoreCase(">")) {
            return builder.greaterThanOrEqualTo(
                    root.<String>get(criterioBusca.getChave()), criterioBusca.getValor().toString());
        } else if (criterioBusca.getOperacao().equalsIgnoreCase("<")) {
            return builder.lessThanOrEqualTo(
                    root.<String>get(criterioBusca.getChave()), criterioBusca.getValor().toString());
        } else if (criterioBusca.getOperacao().equalsIgnoreCase(":")) {
            if (root.get(criterioBusca.getChave()).getJavaType() == String.class) {
                return builder.like(
                        root.<String>get(criterioBusca.getChave()), "%" + criterioBusca.getValor() + "%");
            } else {
                return builder.equal(root.get(criterioBusca.getChave()), criterioBusca.getValor());
            }
        }
        return null;
    }

}

package br.edu.ifrn.ifjobs.dto;

/**
 * @param E is an Entity
 * @param D is a class DTO
 */
public interface Dto<E, D> {

    /**
     * 
     * @return An Entity
     */
    public E convertDtoToEntity();

    /**
     * 
     * @param entity It's an entity
     * @return An DTO (Data Transfer Object)
     */
    public D convertEntityToDto(E entity);
}
